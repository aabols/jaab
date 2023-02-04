import { Outlet } from 'react-router-dom';
import React from 'react';

import NavBar from './NavBar';

const Body = ({ children }) => (
    <div style = {{
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