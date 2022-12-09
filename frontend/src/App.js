//import React, {useState,useEffect} from 'react';
//import axios from 'axios';
import './App.css';
import React from 'react';
import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/member/LoginPage"
import BoardListPage from './pages/BasicBoard/BoardListPage';
import BoardModifyPage from './pages/BasicBoard/BoardModifyPage';
import BoardReadPage from './pages/BasicBoard/BoardReadPage';
import BoardRegisterPage from './pages/BasicBoard/BoardRegisterpage';

import SignUpPage from './pages/member/SignUpPage';

import NotFound from './pages/NotFound';
import Layout from './pages/Layout';



function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />}></Route>
        <Route path="/signUpPage" element={<SignUpPage /> }></Route>
        <Route element={<Layout />}>
          <Route path="/boardListPage" element={<BoardListPage />}></Route>
          <Route path="/boardModifyPage/:boardNo" element={sessionStorage.allowModify ? <BoardModifyPage /> : <NotFound/>}></Route>
          <Route path="/boardReadPage" element={<BoardReadPage />}></Route>
          <Route path="/boardRegisterPage" element={<BoardRegisterPage />}></Route>
          <Route path="/boardReadPage/:boardNo" element={<BoardReadPage /> }></Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
