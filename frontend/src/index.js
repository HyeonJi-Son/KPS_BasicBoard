import React from 'react'
//import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
//import { store } from './app/store'
//import { Provider } from 'react-redux'

import * as ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
reportWebVitals();