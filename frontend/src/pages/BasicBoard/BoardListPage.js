import React from 'react';
import { Link } from "react-router-dom";
import { Button } from 'antd';

import BoardListForm from '../../components/BasicBoard/BoardListForm';
//import styles from './Layout.module.css';

export function BoardListPage() {
    return (
        <div align="center">
            <h1>Board List Page</h1>
            <Link to="/boardRegisterPage">
                <Button>글작성</Button>
            </Link>
            <BoardListForm />
        </div>
    )
}

export default BoardListPage;