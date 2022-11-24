//게시글 수정 삭제 버튼 필요

import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { boardPwCheck, deleteBoard, readBoard } from "../../reducer/boardReducer";
import { Button, Modal, Input, Descriptions, Space, Form } from 'antd';
import styles from '../BasicBoard/BoardComponent.module.css'


export function BoardReadForm() { 
    /*
    1. 현재 Link to = 값을 붙인 router를 BoardList.js 에 작성
    2. App.js에 :boardNo 를 붙인 경로를 작성해두었음.
    3. React는 route에서 제공되는 url Parameter의 hook이 있어서 props가 전달된다.
    App.js의 :boardNo
    4. boardNo가 확인되고, action을 dispatch해서 실행
        - action되는 것은 Reducer의 readBoard이다.
    */
    const { boardNo } = useParams(); //route에서 제공되는 url Parameter의 hook
    const dispatch = useDispatch();
    const { board } = useSelector((state) => state.board);
    const [isModifyOpen, setIsModifyOpen] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState({
        boardNo
    });
    
    useEffect(() => {
        dispatch(readBoard(boardNo)); // action을 dispatch해서 실행
        // dispatch(deleteBoard(boardNo))
    }, [dispatch, boardNo])

    const onModifyModal = () => {
        setIsModifyOpen(true);
        //Modal은 true일 때 open되고 false일 때는 닫힌다.
    }

    const modifyOk = () => {
        //여기에서 확인 버튼을 누르면 boardReducer의 delete 작동
        console.log(data);
        dispatch(boardPwCheck(data));
    }  

    const onDeleteModal = () => {
        setIsOpen(true);
        //Modal은 true일 때 open되고 false일 때는 닫힌다.
    }

    const deleteOk = () => {
        //여기에서 확인 버튼을 누르면 boardReducer의 delete 작동
        console.log(data);
        dispatch(deleteBoard(data));
    }  

    const handleCancel = () => {
        console.log("취소");
        setIsOpen(false);
        setIsModifyOpen(false);
        setData({...data, checkPw: ''})
    }

    const changeInput = (e) => {
        setData({...data, [e.target.name]: e.target.value})
    }

    return (
        <div align="center">
        <form className={styles.tableTwo}>
            <Form.Item wrapperCol={{ offset: 1, span: 1, }}>
                <Link to="/boardListPage">
                    <Button type="default">목록</Button>
                    {/* button 태그를 사용할 때는 꼭 type을 적어두어야 한다. 기본은 submit(즉, 누르면 새로고침됨) */}
                </Link>
            </Form.Item>

            <Descriptions bordered>
            <Descriptions.Item label="제목">{board?.title}</Descriptions.Item>
            <Descriptions.Item label="작성자">{board?.writer}</Descriptions.Item>
            <Descriptions.Item label="content">{board?.content}</Descriptions.Item>
            </Descriptions>
            
            <Space size={[340, 16]} wrap>
                    <Button type="primary" onClick={onModifyModal}> 수정 </Button>
                    <Modal title="Modify Modal" open={isModifyOpen} onOk={modifyOk} onCancel={handleCancel}>
                        <Input.Password name="checkPw" onChange={changeInput}
                            value={data.checkPw}
                            placeholder="비밀번호를 입력해주세요"
                            // iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                    </Modal>

                    <Button type="primary" danger onClick={onDeleteModal}> 삭제 </Button>
                    <Modal title="Delete Modal" open={isOpen} onOk={deleteOk} onCancel={handleCancel}>
                        <Input.Password name="checkPw" onChange={changeInput}
                            value={data.checkPw}
                            placeholder="비밀번호를 입력해주세요"
                            // iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                        />
                    </Modal>
            </Space>
        </form>
    </div>
    )
}

export default BoardReadForm;