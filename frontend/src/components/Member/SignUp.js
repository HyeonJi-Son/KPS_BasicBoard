import React, { useEffect, useState } from 'react';
import { Button, Form, Input } from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { signUp, emailCheck, setEmailChecked } from '../../reducer/memberReducer';
//import styles from './Layout.module.css';

export function SignUp() {
    const [data, setData] = useState({
        nickName: '',
        email: '',
        password: '',
        passwordCheck: ''
    }); //처음의 값은 비어있음. 변화를 감지할 때 마다 추가됨.
    //onChange의 변화를 감지하여 State에 넣어준다.
        //이렇게 해주는 이벤트의 이름이 아래의 changeInput이다.
    const dispatch = useDispatch();
    const { checkedMail } = useSelector(state => state.member);
    const [isValid, setIsValid] = useState(false);

    const changeInput = (e) => {
        setData({...data, [e.target.name]: e.target.value})
        setIsValid(false);
        dispatch(setEmailChecked(false));
            //... <- 기존에 있던 값을 펼친다는 듯.
                        //변화가 감지되는 부분의 name를 찾음.
                                        //해당 name의 value를 찾음
    }

    const submitForm = (e) => { //submit 이벤트
        e.preventDefault();//submit은 기본적으로 자동 새로고침 된다. 그걸 방지해주는 역할.
        dispatch(signUp(data));//reducer의 액션(registBoard)을 호출해준다.
                        //--------- <- 인자로 change에서 만들어준 data를 보내준다.
    }

    const mailCheck = (e) => { //중복확인 버튼을 클릭하는 이벤트가 발생했을 때
        dispatch(emailCheck(data)); //emailCheck라는 reducer를 실행시켜라.
        //그리고 현재 작성된 email 내역을 checkedMail이라는 [어디 변수?]로 저장해라
        //checkedMail이 changeInput의 mail과 같다면 회원가입 버튼 활성화
        //checkedMail이 비어있거나 다르다면 회원가입 버튼 비활성화
    }

    // const checkedMail = data.email();

    //나는 현재 data에 있는 name이 email인 <Input> 속 내역을 checkedMail이라는 함수로 남기고 싶은데
    //이것의 작성 방식이 뭔가 잘못되었다는 건 알겠다.

    const pwCheck = () => {
        //비밀번호 체크는 reducer를 쓸 필요는 없음. backend server 없이
        //현재 페이지의 password와 passwordCheck 를 비교하면 되는 거니까.
        
        if (data.passwordCheck === data.password) {
            return true;
        }

        return false;
    }

    const allowSignUp = () => {
        for (const key in data) {
            if (!data[key]) {
                return false;
            }
        }
        
        if( !pwCheck() ){
            return false;
        }

        return true;
    }

    useEffect(() => {
        setIsValid(allowSignUp());
    }, [data])

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
                        <td> <Button type="default" onClick={mailCheck}> 중복 확인 </Button></td>
                    </tr>
                    <tr>
                        <th> Password </th>
                        <td><Input type="password" name="password" onChange={changeInput} /> </td>
                    </tr>
                    <tr>
                        <th> PasswordCheck </th>
                        <td><Input type="password" name="passwordCheck" onChange={changeInput}  /> </td>
                    </tr>
                </tbody>
            </table>

            <Form.Item wrapperCol={{ offset: 8, span: 16, }} >
            {/*
            1. 비활성화 될 때의 조건
                - changeInput에 변화가 있을 때 (email 중복 확인이 되지 않은 경우)
                - password Check가 비어있는 경우 + 통과 되지 않았을 때.
            2. 그 외에는 활성화

            비활성화 조건이 꽤 많은데(솔직히 지금 생각한 거 보다 더 늘어날 거 같은데) boolean 값을 확인해주는 함수가 따로 있는 게 낫지 않을까.
            
            allowSignUp이라는 함수의 값이 ? 참이면 보여줄 내용 : 거짓일 때 보여줄 내용
            */}           
                
                <Button 
                    type="primary" 
                    htmlType="submit"
                    disabled={!(checkedMail && isValid)}
                > 회원 가입 </Button>
            </Form.Item>
        </form>

    )
}

export default SignUp;