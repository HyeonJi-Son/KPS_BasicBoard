import React from 'react';
import Login from '../../components/Member/LogIn';


export function LoginPage() {

    return (
        <div align="center">
            <h1> Basic Board </h1>
            <Login/>
        </div>
    )
}

export default LoginPage;

/* thead&tbody&tfooter 태그를 꼭 넣어주지 않아도 table 나오는 데에는 문제 없음.
하지만 console창에 추가하라는 메세지가 확인됨. */


