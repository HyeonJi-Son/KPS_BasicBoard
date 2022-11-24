import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { modifyBoard, readBoard } from '../../reducer/boardReducer';
//import styles from './Layout.module.css';


export function BoardModifyForm() {
    const { board } = useSelector((state) => state.board);
    const [data, setData] = useState(null); //처음의 값은 비어있음. 변화를 감지할 때 마다 추가됨.
    //onChange의 변화를 감지하여 State에 넣어준다.
        //이렇게 해주는 이벤트의 이름이 아래의 changeInput이다.
    const dispatch = useDispatch();
    const { boardNo } = useParams(); //route에서 제공되는 url Parameter의 hook

    useEffect(() => {
        dispatch(readBoard(boardNo));
    }, [dispatch, boardNo])
    //첫번째 인자는 함수
    //두번째 인자는 빈 배열이 항상 들어옴. 의존성 주입

    useEffect(() => {
        setData(board);
    }, [board])


    const changeInput = (e) => {
        setData({...data, [e.target.name]: e.target.value})
            //... <- 기존에 있던 값을 펼친다는 듯.
                        //변화가 감지되는 부분의 name를 찾음.
                                        //해당 name의 value를 찾음
    }

    const submitForm = (e) => { //submit 이벤트
        e.preventDefault();//submit은 기본적으로 자동 새로고침 된다. 그걸 방지해주는 역할.
        dispatch(modifyBoard(data));//reducer의 액션(registBoard)을 호출해준다.
                        //--------- <- 인자로 change에서 만들어준 data를 보내준다.
    }

    return (
        <form onSubmit={submitForm}>
            <table>
                <tbody>
                    <tr>
                        <th> 제목 </th>
                        <td><input type="text" name="title" value={data?.title ?? ''} onChange={changeInput} />  </td>
                    </tr>
                    <tr>
                        <th> 작성자 </th>
                        <td><input type="text" name="writer" value={data?.writer ?? ''} onChange={changeInput} /> </td>
                    </tr>
                    <tr>
                        <th> 비밀번호 </th>
                        <td><input type="password" name="password" value={data?.password ?? ''} disabled/> </td>
                    </tr>
                    <tr>
                        <th> 본문 </th>
                        <td><textarea rows="10" cols="22" name="content" value={data?.content ?? ''} onChange={changeInput} /> </td>
                        {/* rows: 세로사이즈/ cols: 가로사이즈  */}
                    </tr>
                </tbody>
            </table>
            <button> 작성 완료 </button>
        </form>
    )
}

export default BoardModifyForm;