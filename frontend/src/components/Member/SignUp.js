import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Button, Form, Input, Select } from 'antd'
import { useDispatch } from 'react-redux';
import { signUp } from '../../reducer/memberReducer';
//import styles from './Layout.module.css';

export function SignUp() {
    const [data, setData] = useState({});
    //비어있는 처음 값 + 변화가 감지된 값 모두 useState에 넣어준다.

    const dispatch = useDispatch;

    const changeInput = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }   //기존 data에서 이벤트(input내용 변화) 감지된 name항목의 value를 추가하여 setData라고 해준다.

    const { Option } = Select;

    const onFinish = (values) => {
        console.log('Success:', values);
      };
    
    const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
    };


    const submitForm = (e) => { //form이 새로고침 될 때
        e.preventDefault();
        dispatch(signUp(data)); //signup
    }



    return (
        <form align="center" onSubmit={submitForm}>
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
                autoComplete="off">

                <Form.Item
                    label="Nickname"
                    name="nickname"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your Nickname!',
                    },
                ]}>
                    <Input placeholder="  닉네임을 입력하세요." onChange={changeInput}/>
                </Form.Item>

                <Form.Item
                    label="EmailAddress"
                    name="email"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your Email Address!',
                    },
                ]}>
                    <Input.Group compact onChange={changeInput}>
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
                ]}>
                    <Input.Password placeholder="  비밀번호를 입력하세요." onChange={changeInput}/>
                </Form.Item>

                <Form.Item
                    label="Password Check"
                    name="passwordcheck"
                    rules={[
                    {
                        required: true,
                        message: 'Please input your password!',
                    },
                ]}>
                    <Input.Password placeholder="  비밀번호를 확인합니다."/>
                </Form.Item>

                <Form.Item
                    wrapperCol={{ offset: 8, span: 16, }}>

                    <Link to="">
                        <Button type="primary" htmlType="submit">
                            회원가입
                        </Button>
                    </Link>

                </Form.Item>    

            </Form>

        </form>
    )
}

export default SignUp;