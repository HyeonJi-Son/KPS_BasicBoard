//import React, {useState,useEffect} from 'react';
//import axios from 'axios';
import './App.css';
import React from 'react';
import { Routes, Route } from "react-router-dom";

import Login from "./components/member/Login"
import Layout from "./components/layout/Layout"

function App() {

  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/layout" element={<Layout />}></Route>
    </Routes>
    //<Login/>
  );
}

export default App;
