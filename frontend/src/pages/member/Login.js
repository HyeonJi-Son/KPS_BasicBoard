import React from 'react';
import { Link } from "react-router-dom";
//import { Routes, Route } from "react-router-dom";
//import Layout from "./components/layout/Layout";
import styles from './Login.module.css';

export function Login() {
    return (
        <div>
            <div className={styles.card}>
                <div className="card-header">
                    <h2>로그인 카드</h2>
                </div>
                <div className="card-body">
                    <table>
{/* thead&tbody&tfooter 태그를 꼭 넣어주지 않아도 table 나오는 데에는 문제 없음.
하지만 console창에 추가하라는 메세지가 확인됨. */}
                        <tbody>
                            <tr>
                                <td>
                                    <p>ID</p>
                                </td>
                                <td>
                                    <textarea></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p>PW</p>
                                </td>
                                <td>
                                    <textarea></textarea>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    아이디 찾기
                                </td>
                                <td>
                                    비밀번호 찾기
                                </td>
                            </tr>
                        </tbody>
                    </table>

                        <Link to="/boardListPage">
                            <button> 로그인 </button>
                        </Link>
                </div>
            </div>
            <button>
                회원가입
            </button>
        </div>
    )
}

export default Login;