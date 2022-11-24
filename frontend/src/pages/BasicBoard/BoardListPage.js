import React from 'react';
import { Link } from "react-router-dom";

import BoardListForm from '../../components/BasicBoard/BoardListForm';
//import styles from './Layout.module.css';

export function BoardListPage() {
    return (
        <div>
            <h1>BoardListPage</h1>
            <Link to="/boardRegisterPage">
                <button>글작성</button>
            </Link>
            <BoardListForm />
        </div>
    )
}

export default BoardListPage;