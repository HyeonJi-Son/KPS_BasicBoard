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
    //onChange의 변화를 감지하여 들어온 데이터가 setData에 담김. State에 넣어준다.
        //이렇게 해주는 이벤트의 이름이 아래의 changeInput이다.
    const dispatch = useDispatch();
    const { checkedMail } = useSelector(state => state.member);
                                    // state는 RootReducer. RootReducer가 가진 memberReducer를 사용하겠다는 뜻
         // Reducer에 있는 initialState를 펼쳐서, 그 중 CheckedMail 값을 현재 파일에서 사용하겠다고 함.                            

    const [isValid, setIsValid] = useState(false);
                                // useState의 기본값이 false
        //isValid <- useState의 값 선언  = const isValid = false; 
        //setIsValid <- 업데이트시켜주는 함수

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

    const pwCheck = () => {
        //비밀번호 체크는 reducer를 쓸 필요는 없음. backend server 없이
        //현재 페이지의 password와 passwordCheck 를 비교하면 되는 거니까.
        
        if (data.passwordCheck === data.password) {
            return true;
        }

        return false;
    }

    const allowSignUp = () => {

        //for...in 문 형식
        //data["key"] 갯수만큼 돌아가는 반복문
        for (const key in data) {
            if (!data[key]) { //data[key]가 비어있다면
                return false; //false를 반환
            }
        }
        
        if( !pwCheck() ){ //만약 pwCheck가 true가 아니라면 false를 반환
            return false;
        }

        return true; //그 외에는 true를 반환
    }

    useEffect(() => {
        setIsValid(allowSignUp());
    }, [data]) //data의 값이 업데이트 될 때마다
                    //setIsValid는 allowSignUp 으로부터 true나 false 값을 반환 받는다.
                    //setIsValid 함수가 값을 새로 반환받으면 isValid의 값이 변한다.

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
                    disabled={!(checkedMail && isValid)} //checkedMail과 isValid의 값이 모두 true여야
                    //disabled={true} <-는 disable되도록 해준다는 뜻이니까
                    //disabled={false} <-조건에 만족함.
                > 회원 가입 </Button>
            </Form.Item>
        </form>

    )
}

export default SignUp;