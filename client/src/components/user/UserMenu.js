import React, { useState } from 'react';
import classNames from 'classnames';
import Popup from 'reactjs-popup';
import { useDispatch, useSelector } from 'react-redux';
import { IoMenuSharp, IoPersonSharp } from 'react-icons/io5';
import { userActions } from '../../_actions/userActions';
import { themeConstants } from '../../_constants/themeConstants';

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
        e.preventDefault();
        dispatch(userActions.logout());
    };

    const handleAccountDelete = (e) => {
        e.preventDefault();
        if (confirmAccountDelete) return dispatch(userActions.deleteAccount());
        setConfirmAccountDelete(true);
        setTimeout(() => setConfirmAccountDelete(false), 1000);
    };

    const trigger = <div className='toolbar__button'>
        <IoMenuSharp/>
    </div>;

    return (
        <Popup
            trigger = { trigger }
            position = 'bottom right'
            offsetX = { -10 }
            arrow = { false }
            closeOnDocumentClick = { true }
            className = 'menu__popup'
        >
            <div id='user-menu' className='menu'>
                <div className='menu__item menu__item--centered'>
                    <div className='userCard'>
                        <div className='userCard__avatar'> <IoPersonSharp/> </div>
                        <div className='userCard__fullName'>{ `${user.firstName} ${user.lastName}` }</div>
                        <div className='userCard__email'>{ user.email }</div>
                    </div>
                </div>
                <div className='menu__divider'/>
                <div className='menu__item menu__item--centered menu__item--clickable menu__item--hoverable' onClick={ handleChangeTheme }>
                    { selectedTheme === 'theme-light' ? 'Dark mode' : 'Light mode' }
                </div>
                <div className='menu__divider'/>
                <div className='menu__item menu__item--centered menu__item--clickable menu__item--hoverable' onClick={ handleLogout }>
                    Log out
                </div>
                <div className='menu__divider'/>
                <div
                    className = {classNames({
                        'menu__item': true,
                        'menu__item--centered': true,
                        'menu__item--clickable': true,
                        'menu__item--hoverable': !confirmAccountDelete,
                        'menu__item--confirm': confirmAccountDelete,
                    })}
                    onClick={handleAccountDelete}
                >
                    { confirmAccountDelete ? 'Confirm delete?' : 'Delete account' }
                </div>
            </div>
        </Popup>
    )
};