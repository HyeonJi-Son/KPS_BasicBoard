import React from 'react';
import { Link } from "react-router-dom";
import { Button, Form, Input, Select } from 'antd'
//import styles from './Layout.module.css';

export function SignUp() {

    const { Option } = Select;

    const onFinish = (values) => {
        console.log('Success:', values);
      };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

    return (
        <div align="center">
            <Link to="/">
                <Button type="default" htmlType="submit">
                    로그인
                </Button>
            </Link>
            <br/><br/>

            <Form
                name="basic"
                labelCol={{ span: 8, }}
                wrapperCol={{ span: 8, }}
                initialValues={{ remember: true, }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >

                <Form.Item
                    label="Nickname"
                    name="nickname"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your Nickname!',
                    },
                    ]}
                >
                    <Input placeholder="  닉네임을 입력하세요."/>
                </Form.Item>

                <Form.Item
                    label="EmailAddress"
                    name="email"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your Email Address!',
                    },
                    ]}
                >
                    <Input.Group compact>
                        <Input
                            style={{
                            width: '60%',
                            }}
                            placeholder="메일 아이디를 입력하세요."
                        />
                        <Select defaultValue="@edu-poly.com" style={{width: '40%'}}>
                            <Option value="kps">@edu-poly.com</Option>
                            <Option value="Naver">@naver.com</Option>
                            <Option value="Google">@Google.com</Option>
                        </Select>
                    </Input.Group>
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
                    <Input.Password placeholder="  비밀번호를 입력하세요."/>
                </Form.Item>

                <Form.Item
                    label="Password Check"
                    name="passwordcheck"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                    ]}
                >
                    <Input.Password placeholder="  비밀번호를 확인합니다."/>
                </Form.Item>

                <Form.Item
                    wrapperCol={{ offset: 8, span: 16, }}
                    >

                    <Link to="">
                        <Button type="primary" htmlType="submit">
                            회원가입
                        </Button>
                    </Link>

                </Form.Item>    

            </Form>

        </div>
    )
}

export default SignUp;