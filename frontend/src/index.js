import React from 'react'
//import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
//import { store } from './app/store'
//import { Provider } from 'react-redux'

import * as ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals'

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
reportWebVitals();