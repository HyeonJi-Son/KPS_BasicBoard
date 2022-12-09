//import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../reducer/memberReducer';
//import { useNavigate } from 'react-router';

import { Button } from 'antd'
import styles from './Member.module.css';


export function LogOutFooter() {

    const { checkedLogIn } = useSelector(state => state.member);
    //const navigate = useNavigate();
    const dispatch = useDispatch();
    const onLogout = () => {
        dispatch(logout(false));
    }

    return (
        <div align="center">
            <footer className={styles.footer}>
                {
                    checkedLogIn 
                            && <Button type="default" onClick={onLogout}> 로그아웃 </Button>
                        
                }


                {/* 로그아웃 버튼은 로그인이 되어있을 때만 보여야 한다.
                만약 checkedLogin이 true면 버튼이 보임. / false면 안보임.

                
                */}
            </footer>
        </div>
    )
}

export default LogOutFooter;