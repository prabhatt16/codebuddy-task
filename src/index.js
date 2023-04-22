import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import worker from './mocks/browser';

worker.start();
if (process.env.NODE_ENV === 'development') {
  // eslint-disable-next-line global-require
  require('./mocks/browser');
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
