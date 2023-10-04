import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {configureAxios} from './axiosConfiguration';

const root = ReactDOM.createRoot(document.getElementById('root'));

configureAxios();
root.render(React.createElement(App));

