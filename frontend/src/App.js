//import React, {useState,useEffect} from 'react';
//import axios from 'axios';
import './App.css';
import React from 'react';
import { Routes, Route } from "react-router-dom";

import Login from "./pages/member/Login"
import BoardListPage from './pages/BasicBoard/BoardListPage';
import BoardModifyPage from './pages/BasicBoard/BoardModifyPage';
import BoardReadPage from './pages/BasicBoard/BoardReadPage';
import BoardRegisterPage from './pages/BasicBoard/BoardRegisterpage';
import NotFound from './pages/NotFound';

function App() {

  return (
    <Routes>
      <Route path="/" element={<Login />}></Route>
      <Route path="/boardListPage" element={<BoardListPage />}></Route>
      <Route path="/boardModifyPage/:boardNo" element={sessionStorage.allowModify ? <BoardModifyPage /> : <NotFound/>}></Route>
      <Route path="/boardReadPage" element={<BoardReadPage />}></Route>
      <Route path="/boardRegisterPage" element={<BoardRegisterPage />}></Route>
      <Route path="/boardReadPage/:boardNo" element={<BoardReadPage /> }></Route>
    </Routes>
    //<Login/>
  );
}

export default App;
