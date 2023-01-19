import React from 'react';
import { Link } from 'react-router-dom';

export default function NavBar() {
    const linkStyle = {
        padding: '0 5px 0 5px'
    };

    const links = [
        { path: '/lists', caption: 'Lists'},
        { path: '/otherthings', caption: 'Other things'},
        { path: '/me', caption: 'Me'},
    ];

    return (
        <>
            {links.map(({path, caption}) => <Link key={path} to={path} style={linkStyle}>{caption}</Link>)}
        </>
    )
};