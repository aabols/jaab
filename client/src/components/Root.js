import { Outlet } from 'react-router-dom';
import React from 'react';

import NavBar from './NavBar';

const Body = ({ children }) => (
    <div style = {{
        backgroundColor: '#ccc',
        height: '100vh',
    }}>
        { children }
    </div>
);
export default function Root() {
    return (
        <Body>
            <NavBar/>
            <Outlet/>
        </Body>
    )
};