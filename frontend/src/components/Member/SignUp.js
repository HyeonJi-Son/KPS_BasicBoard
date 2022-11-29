import React, { useState } from 'react';
import { Button, Form, Input } from 'antd'
import { useDispatch } from 'react-redux';
import { signUp } from '../../reducer/memberReducer';
//import styles from './Layout.module.css';

export function SignUp() {
    const [data, setData] = useState({}); //처음의 값은 비어있음. 변화를 감지할 때 마다 추가됨.
    //onChange의 변화를 감지하여 State에 넣어준다.
        //이렇게 해주는 이벤트의 이름이 아래의 changeInput이다.
    const dispatch = useDispatch();

    const changeInput = (e) => {
        setData({...data, [e.target.name]: e.target.value})
            //... <- 기존에 있던 값을 펼친다는 듯.
                        //변화가 감지되는 부분의 name를 찾음.
                                        //해당 name의 value를 찾음
    }

    const submitForm = (e) => { //submit 이벤트
        e.preventDefault();//submit은 기본적으로 자동 새로고침 된다. 그걸 방지해주는 역할.
        dispatch(signUp(data));//reducer의 액션(registBoard)을 호출해준다.
                        //--------- <- 인자로 change에서 만들어준 data를 보내준다.
    }

    return (
        <form onSubmit={submitForm}>

            <table className="signupTable">
                <tbody>
                    <tr>
                        <th> Nickname </th>
                        <td><Input type="text" name="nickName" onChange={changeInput} /> </td>
                    </tr>
                    <tr>
                        <th> Email </th>
                        <td><Input type="text" name="email" onChange={changeInput} /> </td>
                        <td> <Button type="default" onClick={emailCheck}> 중복확인 </Button></td>
                    </tr>
                    <tr>
                        <th> Password </th>
                        <td><Input type="password" name="password" onChange={changeInput} /> </td>
                    </tr>
                    <tr>
                        <th> PasswordCheck </th>
                        <td><Input type="password" name="passwordCheck" /> </td>
                    </tr>
                </tbody>
            </table>

            <Form.Item wrapperCol={{ offset: 8, span: 16, }} >           
                <Button type="primary" htmlType="submit"> 회원 가입 </Button>
            </Form.Item>
        </form>

    )
}

export default SignUp;