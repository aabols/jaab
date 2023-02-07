import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IoMenuSharp, IoPersonSharp } from 'react-icons/io5';
import Popup from 'reactjs-popup';

import { userActions } from '../../_actions/userActions';
import { themeConstants } from '../../_constants/themeConstants';
import './UserMenu.css';

export default function UserMenu() {
    const [confirmAccountDelete, setConfirmAccountDelete] = useState(false);
    const user = useSelector(state => state.auth.user);
    const selectedTheme = useSelector(state => state.theme.selectedTheme);
    const dispatch = useDispatch();

    const handleChangeTheme = (e) => {
        e.preventDefault();
        if (selectedTheme === 'theme-light') return dispatch({
            type: themeConstants.SELECT_THEME_DARK
        });
        dispatch({ type: themeConstants.SELECT_THEME_LIGHT });
    };

    const handleLogout = (e) => {
        dispatch(userActions.logout());
    };

    const handleAccountDelete = (e) => {
        e.preventDefault();
        if (confirmAccountDelete) return dispatch(userActions.deleteAccount());
        setConfirmAccountDelete(true);
        setTimeout(() => setConfirmAccountDelete(false), 1000);
    }

    return (
        <div id='UserMenu'>
            <Popup
                trigger={
                    <div id='UserMenuButton'>
                        <IoMenuSharp title='Settings' size='1.9em' color='var(--color-accent1)'/>
                    </div>
                }
                position='bottom right'
                arrow={false}
                overlayStyle={{display: 'none'}}
                closeOnDocumentClick={true}
            >
                <div id='UserMenuContent'>
                    <div> <IoPersonSharp size='2.5em'/> </div>
                    <div className='name'>{ `${user.firstName} ${user.lastName}` }</div>
                    <div className='email'>{ user.email }</div>
                    <div className='menuRow menuItem' onClick={handleChangeTheme}>{selectedTheme === 'theme-light' ? 'Dark mode' : 'Light mode'}</div>
                    <div className='menuRow menuItem' onClick={handleLogout}>Log out</div>
                    <div className={`menuRow menuItem${confirmAccountDelete ? ' confirm' : ''}`} onClick={handleAccountDelete}>
                        {confirmAccountDelete ? 'Confirm delete?' : 'Delete account'}
                    </div>
                </div>
            </Popup>
        </div>
    )
};