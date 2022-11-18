import React from 'react'
//import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { store } from './store/store'
import { Provider } from 'react-redux'
//Provider를 다시 넣었음. redux 사용을 위해서.

import * as ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios'

axios.defaults.withCredentials = true;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
);
reportWebVitals();