import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedRoute({ protection, redirectPath, children }) {
    const user = useSelector(state => state.auth.user);

    if (protection(user)) return children ? children : <Outlet/>;
    
    return <Navigate to={redirectPath} replace/>;
};