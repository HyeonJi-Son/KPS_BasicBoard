import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registBoard } from '../../reducer/boardReducer';


export function BoardRegisterForm() {
    const [data, setData] = useState({});
    //onChange의 변화를 감지하여 State에 넣어준다.
        //이렇게 해주는 이벤트의 이름이 아래의 changeInput이다.
    const dispatch = useDispatch();

    const changeInput = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }

    const submitForm = (e) => { //submit 이벤트
        e.preventDefault();//submit은 기본적으로 자동 새로고침 된다. 그걸 방지해주는 역할.
        dispatch(registBoard(data));//reducer의 액션(registBoard)을 호출해준다.
                        //--------- <- 인자로 change에서 만들어준 data를 보내준다.
    }

    return (
        <form onSubmit={submitForm}>
            <button type="button">목록</button>
            <table>
                <tbody>
                    <tr>
                        <th> 제목 </th>
                        <td><input type="text" name="title" onChange={changeInput} /> </td>
                    </tr>
                    <tr>
                        <th> 작성자 </th>
                        <td><input type="text" name="writer" onChange={changeInput} /> </td>
                    </tr>
                    <tr>
                        <th> 비밀번호 </th>
                        <td><input type="password" name="password" onChange={changeInput} /> </td>
                    </tr>
                    <tr>
                        <th> 본문 </th>
                        <td><textarea rows="10" cols="22" name="content" onChange={changeInput} /> </td>
                        {/* rows: 세로사이즈/ cols: 가로사이즈  */}
                    </tr>
                </tbody>
            </table>
            <button> 작성 완료 </button>
        </form>
    )
}

export default BoardRegisterForm;