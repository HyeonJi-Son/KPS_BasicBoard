import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { registBoard } from '../../reducer/boardReducer';
import { Button, Form, Input } from 'antd';
import styles from '../BasicBoard/BoardComponent.module.css'


export function BoardRegisterForm() {
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
        dispatch(registBoard(data));//reducer의 액션(registBoard)을 호출해준다.
                        //--------- <- 인자로 change에서 만들어준 data를 보내준다.
    }

    const { TextArea } = Input;

    return (
        <form onSubmit={submitForm}>
            <Link to="/boardListPage">
                <Form.Item wrapperCol={{ offset: 1, span: 16, }} >           
                    <Button type="default"> 목록 </Button>
                </Form.Item>
            {/* button 태그를 사용할 때는 꼭 type을 적어두어야 한다. 기본은 submit(즉, 누르면 새로고침됨) */}
            </Link>

            <table className={styles.tableTwo}>
                <tbody>
                    <tr>
                        <th> 제목 </th>
                        <td><Input type="text" name="title" onChange={changeInput} /> </td>
                    </tr>
                    <tr>
                        <th> 작성자 </th>
                        <td><Input type="text" name="writer" onChange={changeInput} /> </td>
                    </tr>
                    <tr>
                        <th> 비밀번호 </th>
                        <td><Input type="password" name="password" onChange={changeInput} /> </td>
                    </tr>
                    <tr>
                        <th> 본문 </th>
                        <td><TextArea rows="10" cols="22" name="content" onChange={changeInput} /> </td>
                        {/* rows: 세로사이즈/ cols: 가로사이즈  */}
                    </tr>
                </tbody>
            </table>

            <Form.Item wrapperCol={{ offset: 8, span: 16, }} >           
                <Button type="primary" htmlType="submit"> 작성 완료 </Button>
            </Form.Item>
        </form>
    )
}

export default BoardRegisterForm;