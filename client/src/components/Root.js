import { Outlet } from 'react-router-dom';
import React from 'react';

import NavBar from './NavBar';

export default function Root() {
    return (
        <>
            <NavBar />
            <Outlet />
        </>
    )
};