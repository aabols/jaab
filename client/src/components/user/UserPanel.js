import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { userActions } from '../../_actions/userActions';

export default function UserPanel() {
    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    const handleLogout = (e) => {
        dispatch(userActions.logout());
    };

    const handleDelete = (e) => {
        if (deleteConfirm) return dispatch(userActions.deleteAccount());
        setDeleteConfirm(true);
        setTimeout(() => setDeleteConfirm(false), 1000);
    };

    return (
        <>
            <div>
                { `${user.firstName} ${user.lastName}` }
            </div>
            <div>
                { user.email }
            </div>
            <div>
                <input
                    type='button'
                    value='Logout'
                    onClick={ handleLogout }
                />
            </div>
            <div>
                <input
                    type = 'button'
                    style = {{ backgroundColor: deleteConfirm ? '#f66' : '#faa' }}
                    value = { deleteConfirm ? 'Confirm account delete' : 'Delete account' }
                    onClick = { handleDelete }
                />
            </div>
        </>
    )
};