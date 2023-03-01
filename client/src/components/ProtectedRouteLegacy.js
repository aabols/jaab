import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedRouteLegacy({ protection, redirectPath, children }) {
    const user = useSelector(state => state.auth.user);
    const legacyUser = useSelector(state => state.auth.legacyUser);

    if (protection(user, legacyUser)) return children ? children : <Outlet />;

    return <Navigate to={redirectPath} replace />;
};