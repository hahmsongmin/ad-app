import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import GlobalStyle from './styles';

ReactDOM.render(
  <React.StrictMode>
    <div>
      <button className="ad">출석부클릭</button>
    </div>
    <GlobalStyle />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
