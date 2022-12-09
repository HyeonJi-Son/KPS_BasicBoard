import React, { useEffect } from 'react';
import LogOutFooter from '../components/Member/LogOutFooter';
import { useSelector} from 'react-redux';
import { useNavigate } from 'react-router';

//import styles from './Layout.module.css';

const Layout = ({children}) => {

    const {checkedLogIn} = useSelector(state => state.member);
    const navigate = useNavigate();

    useEffect(() => {
        if (checkedLogIn) {
            return;
        }

        navigate("/");

    }, [checkedLogIn, navigate])


    return (
        <div>
            <main>
                {children}
            </main>
            {
                checkedLogIn && <LogOutFooter/>
            }
        </div>
    )
}

export default Layout;