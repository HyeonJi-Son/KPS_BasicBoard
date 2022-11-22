import React from 'react';
import axios from 'axios';
//import styles from './Layout.module.css';

import BoardRegisterForm from '../../components/BasicBoard/BoardRegisterForm';

export function BoardRegisterPage() {
    return (
        <div>
            <h1>BoardRegisterPage</h1>
            <BoardRegisterForm />
        </div>
    )
}

export default BoardRegisterPage;