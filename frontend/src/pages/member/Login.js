import React from 'react';
import { Link } from "react-router-dom";
import { Button, Form, Input } from 'antd'

//import { Routes, Route } from "react-router-dom";
//import Layout from "./components/layout/Layout";
import styles from './Login.module.css';

export function Login() {

    const onFinish = (values) => {
        console.log('Success:', values);
      };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };


    return (
        <div className={styles.basic}>

            <h1> Basic Board </h1>

            <Form
                name="basic"
                labelCol={{ span: 8, }}
                wrapperCol={{ span: 8, }}
                initialValues={{ remember: true, }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off" >

                <Form.Item
                    label="Username"
                    name="username"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your username!',
                    },
                    ]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                    ]}
                >
                    <Input.Password />
                    </Form.Item>

                    <Form.Item
                    wrapperCol={{ offset: 8, span: 16, }}
                    >
                        <Link to="/boardListPage">
                            <Button type="primary" htmlType="submit">
                                로그인
                            </Button>
                        </Link>        
                    </Form.Item>
            </Form>
        </div>
    )

}

export default Login;

/* thead&tbody&tfooter 태그를 꼭 넣어주지 않아도 table 나오는 데에는 문제 없음.
하지만 console창에 추가하라는 메세지가 확인됨. */


