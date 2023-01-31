import React, { useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { listsActions } from '../_actions/listsActions';
import Group from './Group';

const Body = ({ children }) => (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        padding: '5px',
    }}> { children } </div>
);

const Toolbar = ({ children }) => (
    <div style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: '5px',
        gap: '20px',
    }}>{ children }</div>
);

const ListLayout = ({ children }) => (
    <div style={{
        display: 'flex',
        flexFlow: 'row wrap',
        alignItems: 'flex-start',
        alignContent: 'flex-start',
        justifyContent: 'space-evenly',
        gap: '20px',
    }}> { children } </div>
);

const sortOptions = {
    titleAZ: {
        title: 'By title A-Z',
        fn: (a,b) => a.title.localeCompare(b.title)
    },
    titleZA: {
        title: 'By title Z-A',
        fn: (a,b) => b.title.localeCompare(a.title)
    },
    lengthAscending: {
        title: 'Shortest first',
        fn: (a,b) => a.itemCount - b.itemCount
    },
    lengthDescending: {
        title: 'Longest first',
        fn: (a,b) => b.itemCount - a.itemCount
    },
};
const sortOptionKeys = Object.keys(sortOptions);

export default function List() {
    const dispatch = useDispatch();
    const { listId } = useParams();
    const theme = useSelector(state => state.theme.selectedTheme);
    const lists = useSelector(state => state.lists.lists);
    const allGroups = useSelector(state => state.lists.groups);
    const allItems = useSelector(state => state.lists.items);
    const [sortOptionKey, setSortOptionKey] = useState(sortOptionKeys[0])
    const sortFunction = sortOptions[sortOptionKey].fn;

    const list = lists.find(list => list.id === listId);
    if (!list) return <Navigate to='..'/>;
    
    const groups = allGroups.filter(group => group.listId === list.id);
    const items = allItems.filter(item => !!groups.find(group => group.id === item.groupId));

    const createGroupButton = <input
        type='button'
        value='+'
        style = {{
            fontSize: '2em',
            padding: '0 30px',
            color: theme[0],
            borderColor: theme[0],
        }}
        onClick={e => {
            const title = prompt(`New group in ${list.title}:`);
            if (!title) return;
            dispatch(listsActions.createGroupLocal({ listId: list.id, title }))
        }}
    />;
    const sortModeSelector = <div style={{
        color: theme[0],
    }}>Sort <select value={sortOptionKey} onChange={e => {
        setSortOptionKey(e.target.value);
    }}>
        {sortOptionKeys.map(option => <option key={option} value={option}>{sortOptions[option].title}</option>)}
    </select></div>
    const groupComponents = groups
        .map(group => ({...group, itemCount: items.filter(item => item.groupId === group.id).length}))
        .sort(sortFunction)
        .map(({ id }) => <Group key={id} groupId={id}/>);

    return (
        <Body>
            <Toolbar> { createGroupButton } { sortModeSelector } </Toolbar>
            <ListLayout> { groupComponents } </ListLayout>
        </Body>
    )
};