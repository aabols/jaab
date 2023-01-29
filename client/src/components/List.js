import React from 'react';
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

const ListLayout = ({ children }) => (
    <div style={{
        display: 'flex',
        flexFlow: 'row wrap',
        justifyContent: 'space-evenly',
        gap: '20px'
    }}> { children } </div>
);

export default function List() {
    const dispatch = useDispatch();
    const { listId } = useParams();
    const lists = useSelector(state => state.lists.lists);
    const allGroups = useSelector(state => state.lists.groups);

    const list = lists.find(list => list.id === listId);
    if (!list) return <Navigate to='..'/>;
    
    const groups = allGroups.filter(group => group.listId === list.id);

    const createGroupButton = <input
        type='button'
        value='+'
        style = {{
            alignSelf: 'center',
            fontSize: '2em',
            padding: '0 30px',
            margin: '20px',
            color: 'orange',
            borderColor: 'orange',
        }}
        onClick={e => {
            const title = prompt(`New group in ${list.title}:`);
            if (!title) return;
            dispatch(listsActions.createGroupLocal({ listId: list.id, title }))
        }}
    />;
    const groupComponents = groups.map(({ id }) => <Group key={id} groupId={id}/>);

    return (
        <Body>
            { createGroupButton }
            <ListLayout> { groupComponents } </ListLayout>
        </Body>
    )
};