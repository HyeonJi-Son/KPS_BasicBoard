import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { findAllBoard } from '../../reducer/boardReducer';
import styles from './BoardList.module.css';

export function BoardList() {
    const dispatch = useDispatch();
    const { boards } = useSelector((state) => state.board);
    //8번째 줄의 board는 RootReducer에서 slice의 name값으로 불러온 것이다.
    //boards는 board의 state.
    useEffect(() => {
        //useEffect: 컴포넌트가 렌더링 될 때 특정 작업을 실행할 수 있도록 하는 훅
        dispatch(findAllBoard());
    }, [dispatch])

    //현재 BoardList는 사이트에 재진입하지 않으면 변경사항이 적용되지 않도록 되어있다.

    return (
        <div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>
                            번호
                        </th>
                        <th>
                            제목
                        </th>
                        <th>
                            작성자
                        </th>
                        <th>
                            작성 시간
                        </th>
                    </tr>
                </thead>
                <tbody>
                        {/*태그 사이에 띄어쓰기가 들어가면 안된다.
                        ex: <tr> <td> <- 이런 식으로 사용(x)*/}
                    {
                        boards?.length <= 0 
                            ? <tr><td> 등록된 게시글이 없습니다.</td></tr>
                            : boards?.map(board => {
                                return (
                                    <tr key={`board-${board.id}`}>
                                {/* key값을 적는 형식은 늘 같지만
                                선정할 때 반드시 겹치지않는 고유값을 넣을 것 */}
                                        <td>
                                            {board.id}
                                        </td>
                                        <td>
                                            {board.userName}
                                        </td>
                                        <td>
                                            {board.password}
                                        </td>
                                        <td>
                                            {board.email}
                                        </td>
                                    </tr>
                                )
                            })
                    }

                </tbody>
            </table>
        </div>
    )
}

export default BoardList;