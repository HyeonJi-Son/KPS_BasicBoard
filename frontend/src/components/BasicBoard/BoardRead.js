//게시글 수정 삭제 버튼 필요

import React, { useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { readBoard } from "../../reducer/boardReducer";
//import styles from './Layout.module.css';


export function BoardRead() { 
    /*
    1. 현재 Link to = 값을 붙인 router를 BoardList.js 에 작성
    2. App.js에 :boardNo 를 붙인 경로를 작성해두었음.
    3. React는 route에서 제공되는 url Parameter의 hook이 있어서 props가 전달된다.
    App.js의 :boardNo
    4. boardNo가 확인되고, action을 dispatch해서 실행
        - action되는 것은 Reducer의 readBoard이다.
    */
    const { boardNo } = useParams(); //route에서 제공되는 url Parameter의 hook
    const dispatch = useDispatch();
    const { board } = useSelector((state) => state.board);
    
    useEffect(() => {
        dispatch(readBoard(boardNo)); // action을 dispatch해서 실행
    }, [dispatch, boardNo])


    return (
        <form>
            <Link to="/boardListPage">
                <button type="button">목록</button>
            {/* button 태그를 사용할 때는 꼭 type을 적어두어야 한다. 기본은 submit(즉, 누르면 새로고침됨) */}
            </Link>
            <table>
                <tbody>
                    <tr>
                        <th> 제목 </th>
                        <td> {board?.title} </td>
                    </tr>
                    <tr>
                        <th> 작성자 </th>
                        <td> {board?.writer} </td>
                    </tr>
                    <tr>
                        <th> 본문 </th>
                        <td> {board?.content}</td>
                        {/* rows: 세로사이즈/ cols: 가로사이즈  */}
                    </tr>
                </tbody>
            </table>
            <button type="button"> 수정 </button>
            <button type="button"> 삭제 </button>
        </form>
    )
}

export default BoardRead;