import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const Body = ({ children }) => (
    <div style = {{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch',
    }}>
        { children }
    </div>
);

export default function NavBar() {
    const theme = useSelector(state => state.theme.selectedTheme);

    const links = [
        { path: '/lists', caption: 'Lists'},
        { path: '/otherthings', caption: 'Other things'},
        { path: '/me', caption: 'Me'},
    ];

    const linkComponents = links
        .map(({ path, caption }) => (
            <NavLink
                key = { path }
                to = { path }
                style = {({ isActive }) => ({
                    display: 'flex',
                    alignItems: 'center',
                    padding: '5px 20px',
                    backgroundColor: isActive ? theme[0] : theme[1],
                    color: isActive ? theme[1] : theme[0],
                    textDecoration: 'none',
                    fontSize: '1.2em',
                })}
            >
                { caption }
            </NavLink>
        ));

    return (
        <Body>
            { linkComponents }
        </Body>
    )
};