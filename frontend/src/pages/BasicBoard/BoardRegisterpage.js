import React from 'react';
import axios from 'axios';
//import styles from './Layout.module.css';

import BoardRegisterForm from '../../components/BasicBoard/BoardRegisterForm';

const submitForm = (payload) => {
    axios
        .get('basicBoard/register')
        .then((result) => {
            //stateChange([...state, ...result.data]);
            alert("게시글 등록 성공")
            window.location = '/boardListPage'            
        })
        .cathch(() => {
            console.log("실패");
            alert("게시글 등록 실패")
        });
}

export function BoardRegisterPage() {
    return (
        <div>
            <h1>BoardRegisterPage</h1>
            <BoardRegisterForm />
        </div>
    )
}

export default BoardRegisterPage;