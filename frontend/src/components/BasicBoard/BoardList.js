import React from 'react';
import styles from './BoardList.module.css';


export function BoardList() {
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
{/* tbody의 내용이
if 불러올 list가 없다면 등록된 게시글이 없다고 보여야 함.
else 그 외의 경우 등록된 게시글이 보여야 함.

react에서는 if else를 어떻게 적용시키면 되는지 알 필요가 있음.*/}
                <tbody>
                    <tr>
                        <td>
                            1
                        </td>
                        <td>
                            제목이 여기에
                        </td>
                        <td>
                            작성자명
                        </td>
                        <td>
                            2022-11-26
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default BoardList;