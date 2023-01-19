import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { userActions } from '../_actions/userActions';

export default function UserPanel() {
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    const handleLogout = (e) => {
        dispatch(userActions.logout());
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
        </>
    )
};