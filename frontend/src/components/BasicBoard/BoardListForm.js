import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { findAllBoard } from '../../reducer/boardReducer';
import { Link } from "react-router-dom";

import { Table } from 'antd';

//import styles from './BoardList.module.css';

export function BoardList() {
    const dispatch = useDispatch();
    const { boards } = useSelector((state) => state.board);
    //8번째 줄의 board는 RootReducer에서 slice의 name값으로 불러온 것이다.
    //boards는 board의 state.
    useEffect(() => {
        //useEffect: 컴포넌트가 렌더링 될 때 특정 작업을 실행할 수 있도록 하는 훅
        dispatch(findAllBoard());
    }, [dispatch])
    //---- ->특정한 값이 들어가 있다면 (ex:boards) boards에 그 부분에 변경이 있거나
            // 할 때 변경사항이 적용된다.
            //[dispatch]만 넣어두는 것은 []와 결과가 다르지 않다.
                //아무것도 없이 비워두면 warning이 뜬다.

    //현재 BoardList는 사이트에 재진입하지 않으면 변경사항이 적용되지 않도록 되어있다.


    const columns = [
        {
          title: '번호',
          dataIndex: 'boardNo',
          key: 'boardNo',
        },
        {
            title: '제목',
            dataIndex: 'title',
            key: 'title',
            render: (text, board) => <Link to ={`/boardReadPage/${board.boardNo}`} >{text}</Link>,
        },
        {
          title: '작성자',
          dataIndex: 'writer',
          key: 'writer',
        },
        {
          title: '작성 일자',
          dataIndex: 'regDate',
          key: 'regDate',          
        },
      ];

    return (
        <div>
            <Table
                columns={columns}
                dataSource={boards}
            />
        </div>
    )
}

export default BoardList;