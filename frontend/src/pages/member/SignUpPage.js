import React from 'react';
import { Link } from "react-router-dom";
import { Button } from 'antd'
import SignUp from '../../components/Member/SignUp';
//import styles from './Layout.module.css';

export function SignUpPage() {
    return (
        <div align="center">
            <h1>SignUpPage</h1>
            <Link to="/">
                <Button type="default" htmlType="submit">
                    로그인
                </Button>
            </Link>
            <br/><br/>
            <SignUp/>
        </div>
    )
}

export default SignUpPage;