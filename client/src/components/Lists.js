import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';

import { listsActions } from '../_actions/listsActions';

const Body = ({ children }) => (
    <div style = {{
        display: 'flex',
        flexDirection: 'row'
    }}>
        { children }
    </div>
);
const LeftPane = ({ children }) => (
    <div style = {{
        display: 'flex',
        flexDirection: 'column',
        padding: '40px 5px 0px 5px',
    }}>
        { children }
    </div>
);
const RightPane = ({ children }) => (
    <div style = {{
        flexGrow: 1
    }}>
        { children }
    </div>
);
const ListLink = ({ id, title, onContextMenu }) => {
    const theme = useSelector(state => state.theme.selectedTheme);
    return (
        <NavLink
            to = { id }
            onContextMenu = { onContextMenu }
            style = {({ isActive }) => ({
                textDecoration: 'none',
                textAlign: 'center',
                fontSize: '1.2em',
                margin: '2px',
                padding: '5px',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: theme[0],
                borderRadius: '5px',
                backgroundColor: isActive ? theme[0] : theme[1],
                color: isActive ? theme[1] : theme[0],
            })}
        >
            { title }
        </NavLink>
    )
};

export default function Lists() {
    const [searchQuery, setSearchQuery] = useState('');
    const dispatch = useDispatch();
    const lists = useSelector(state => state.lists.lists);
    const theme = useSelector(state => state.theme.selectedTheme);

    const handleCreateList = (e) => {
        e.preventDefault();
        const title = searchQuery;
        if (!title) return;
        setSearchQuery('');
        dispatch(listsActions.createListLocal({ title }));
    };

    const handleRenameList = (e, id) => {
        e.preventDefault();
        const list = lists.find(list => list.id === id);
        const title = prompt(`Rename ${list.title}:`, list.title);
        if (title === null) return;
        if (!title) return dispatch(listsActions.deleteListLocal(list.id));
        dispatch(listsActions.changeListLocal({ ...list, title }));
    };
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const searchBox = <input
        type = 'text'
        name = 'title'
        placeholder = 'Find or create'
        value = { searchQuery }
        onChange = { handleSearchChange }
        style = {{
            fontSize: '1.2em',
            color: theme[0],
            backgroundColor: theme[1],
        }}
    />;
    const searchForm = <form
        onSubmit = { handleCreateList }
    > { searchBox } </form>;
    const listComponents = lists
        .filter(list => list.title.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a,b) => a.title.localeCompare(b.title))
        .map(({ id, title }) => (
            <ListLink
                key = { id }
                id = { id }
                title = { title }
                onContextMenu = { (e) => handleRenameList(e, id) }
            />
        ));
    
    return (
        <Body>
            <LeftPane>
                { searchForm }
                { listComponents }
            </LeftPane>
            <RightPane> <Outlet/> </RightPane>
        </Body>
    )
};