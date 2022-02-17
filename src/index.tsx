import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GlobalStyle from './styles';
import ApiCallers from './service/api';
import EventEmitter from 'events';

class EventHandle extends EventEmitter {}
const apiCaller = ApiCallers.makeApi();
export const emitter = new EventHandle();

// 아래 3가지 사항 출석부로 넘겨주세요 (Test Value)
const isAdmin: boolean = true; // true 관리자, false 일반유저
const spaceId: number = 479;
const memberId: number = 6583;

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
    <App apiCaller={apiCaller} />
  </React.StrictMode>,
  document.getElementById('root')
);
