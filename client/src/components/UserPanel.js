import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { userActions } from '../_actions/userActions';

export default function UserPanel() {
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    const handleLogout = (e) => {
        dispatch(userActions.logout());
    };

    const handleDelete = (e) => {
        if (!deleteConfirm) return setDeleteConfirm(true);
        dispatch(userActions.deleteAccount());
    };

    return (
        <>
            <div>
                {user.firstName} {user.lastName}
            </div>
            <div>
                {user.email}
            </div>
            <input type='button' value='Logout' onClick={handleLogout}/>
            <input type='button' value={deleteConfirm ? 'Confirm account delete' : 'Delete account'} onClick={handleDelete}/>
        </>
    )
};