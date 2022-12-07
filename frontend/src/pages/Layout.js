import React from 'react';
import LogOutFooter from '../components/Member/LogOutFooter';
//import styles from './Layout.module.css';

const Layout = ({children}) => {
    return (
        <div>
            <main>
                {children}
            </main>
            <LogOutFooter/>
        </div>
    )
}

export default Layout;