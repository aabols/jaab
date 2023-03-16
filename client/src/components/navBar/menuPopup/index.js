import React from 'react';
import Popup from 'reactjs-popup';
import { IoMenuSharp } from 'react-icons/io5';
import UserMenu from './userMenu';

export default function MenuPopup() {
    const menuButton = <div className='toolbar__button'> <IoMenuSharp /> </div>;

    return (
        <Popup
            trigger={menuButton}
            position='bottom right'
            offsetX={-10}
            arrow={false}
            closeOnDocumentClick={true}
            className='menu__popup'
            children={<UserMenu />}
        />
    )
};
