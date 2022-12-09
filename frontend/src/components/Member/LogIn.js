import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { logIn } from '../../reducer/memberReducer';
import { Link } from "react-router-dom";
import { Button, Form, Input } from 'antd'
import { useNavigate } from 'react-router';

export function Login() {
    const [data, setData] = useState({});
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { checkedLogIn } = useSelector((state) => state.member);

    const changeInput = (e) => {
        setData({...data, [e.target.name]: e.target.value})
            //... <- 기존에 있던 값을 펼친다는 듯.
                        //변화가 감지되는 부분의 name를 찾음.
                                        //해당 name의 value를 찾음
    }

    //만약 email이나 password를 입력하지 않고 로그인버튼을 클릭하려고 하면
    //둘 모두 입력해달라는 alert 창이 뜨면 좋을 것 같음.
    const submitForm = (e) => { //submit 이벤트
        e.preventDefault();//submit은 기본적으로 자동 새로고침 된다. 그걸 방지해주는 역할.
        dispatch(logIn(data));//reducer의 액션(registBoard)을 호출해준다.
                        //--------- <- 인자로 change에서 만들어준 data를 보내준다.
    }

    useEffect(() => {
        if (!checkedLogIn) {
            return;
        }
        navigate("/boardListPage");
    }, [checkedLogIn, navigate]);

    return (
        <form onSubmit={submitForm}>

            <table>
                <tbody>
                    <tr>
                        <td>
                            <Input type="text" name="email" placeholder='Email Address' onChange={changeInput} />
                        </td>

                    </tr>
                    <tr>
                        <td>
                            <Input.Password type="password" name="password" placeholder='Password' onChange={changeInput} />
                        </td>
                    </tr>
                </tbody>
            </table>

            <br/>

            <Form.Item
            wrapperCol={{ offset: 5, span: 16, }}
            >
                    <Button type="primary" htmlType="submit">
                        로그인
                    </Button>
                &ensp;&ensp;
                <Link to="/signUpPage">
                    <Button type="primary" htmlType="submit">
                        회원가입
                    </Button>
                </Link>          
            </Form.Item>

        </form>
    )

}

export default Login;