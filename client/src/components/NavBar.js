import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavBar.css';
import UserMenu from './user/UserMenu';

export default function NavBar() {
    const links = [
        { path: '/lists', caption: 'Lists'},
    ];

    const linkComponents = links
        .map(({ path, caption }) => (
            <NavLink key = { path } to = { path }>
                { caption }
            </NavLink>
        ));

    return (
        <div id='NavBar'>
            { linkComponents }
            <div className='spacer'></div>
            <UserMenu/>
        </div>
    )
};