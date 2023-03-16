import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActions } from '../../../../_actions/user';
import { settingsActions } from '../../../../_actions/settings';
import { themeConstants } from '../../../../_constants/themeConstants';
import UserCard from './userCard';
import MenuItem from './menuItem';
import MenuItemConfirm from './menuItemConfirm';

export default function UserMenu() {
    const selectedTheme = useSelector(state => state.theme.selectedTheme);
    const dispatch = useDispatch();

    const handleChangeTheme = (e) => {
        e.preventDefault();
        if (selectedTheme === themeConstants.LIGHT_THEME_CLASSNAME) {
            dispatch(settingsActions.setDarkTheme());
        } else {
            dispatch(settingsActions.setLightTheme());
        }
    };

    const handleLogout = (e) => {
        e.preventDefault();
        dispatch(userActions.logout());
    };

    const handleAccountDelete = (e) => {
        e.preventDefault();
        dispatch(userActions.deleteAccount());
    };

    const themeText = selectedTheme === themeConstants.LIGHT_THEME_CLASSNAME ? 'Dark mode' : 'Light mode'

    return (
        <div id='user-menu' className='menu'>
            <MenuItem children={<UserCard />} />
            <div className='menu__divider' />
            <MenuItem onClick={handleChangeTheme} children={themeText} />
            <div className='menu__divider' />
            <MenuItem onClick={handleLogout} children='Log out' />
            <div className='menu__divider' />
            <MenuItemConfirm value='Delete account' onClick={handleAccountDelete} />
        </div>
    )
};
