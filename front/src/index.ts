import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {configureAxios} from './axiosConfiguration';
import * as serviceWorker from './serviceWorker';

declare let window: any;

const startApp = () => {
  const root = ReactDOM.createRoot(document.getElementById('root'));

  configureAxios();
  root.render(React.createElement(App));
  serviceWorker.register();
}

if (window.cordova) {
  document.addEventListener('deviceready', startApp, false);
} else {
  startApp();
}


