import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GlobalStyle from './styles';
import ApiCallers from './service/api';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { enUS } from '@mui/material/locale';
import EventEmitter from 'events';

class EventHandle extends EventEmitter {}
const apiCaller = ApiCallers.makeApi();
export const emitter = new EventHandle();

// 아래 3가지 사항 출석부로 넘겨주세요 (Test Value)
const isAdmin: boolean = true; // true 관리자, false 일반유저
const spaceId: number = 479;
const memberId: number = 6583;

const theme = createTheme(enUS);

ReactDOM.render(
  <React.StrictMode>
    <button
      onClick={() => {
        emitter.emit('isAdClick', { isAdmin, spaceId, memberId });
      }}
    >
      출석부클릭
    </button>
    <GlobalStyle />
    <ThemeProvider theme={theme}>
      <App apiCaller={apiCaller} />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
