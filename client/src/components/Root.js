import { Outlet } from 'react-router-dom';
import React from 'react';

import NavBar from './navBar';
import UserMigration from './UserMigration';
import { useSelector } from 'react-redux';

export default function Root() {
    const legacyUser = useSelector(state => state.auth.legacyUser);
    const user = useSelector(state => state.auth.user);
    return (
        <>
            {!!legacyUser && <UserMigration />}
            {!!user && <NavBar />}
            {!!user && <Outlet />}
        </>
    );
};
