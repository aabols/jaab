import React from 'react';
import { NavLink } from 'react-router-dom';
import MenuPopup from './menuPopup';

export default function NavBar() {
    const links = [
        { path: '/lists', caption: 'Lists' },
    ];

    const linkComponents = links
        .map(({ path, caption }) => (
            <NavLink key={path} to={path} className='linkButton'>
                {caption}
            </NavLink>
        ));

    return (
        <div id='navigation-bar' className='toolbar'>
            <div className='toolbar__group toolbar__group--justify-left'>
                {linkComponents}
            </div>
            <div className='toolbar__group toolbar__group--justify-right'>
                <MenuPopup />
            </div>
        </div>
    )
};
