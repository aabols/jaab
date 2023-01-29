import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { listsActions } from '../_actions/listsActions';
import Item from './Item';

const Body = ({ children }) => (
    <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        padding: '0 10px 10px 10px',
        backgroundColor: 'orange',
        color: '#555',
        borderRadius: '10px 10px 5px 5px',
    }}>
        { children }
    </div>
);

export default function Group({ groupId }) {
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState('');
    const groups = useSelector(state => state.lists.groups);
    const allItems = useSelector(state => state.lists.items);

    const group = groups.find(group => group.id === groupId);
    const items = allItems.filter(item => item.groupId === group.id);

    const handleRenameGroup = (e) => {
        e.preventDefault();
        const title = prompt(`Rename ${group.title}:`, group.title);
        if (title === null) return;
        if (!title) return dispatch(listsActions.deleteGroupLocal(group.id));
        dispatch(listsActions.changeGroupLocal({ ...group, title }));
    };
    const handleCreateItem = (e) => {
        e.preventDefault();
        const title = searchQuery;
        setSearchQuery('');
        dispatch(listsActions.createItemLocal({ groupId: group.id, title, checked: false }));
    };
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const groupCaption = <div
        onContextMenu = { handleRenameGroup }
        style = {{
            textAlign: 'center',
            fontSize: '1.5em',
            marginBottom: '5px',
        }}
    > { group.title } </div>;
    const searchBox = <input
        type = 'text'
        name = 'title'
        placeholder = 'Filter or create'
        value = { searchQuery }
        onChange = { handleSearchChange }
        style = {{
            fontSize: '1em',
        }}
    />
    const searchForm = <form
        onSubmit = { handleCreateItem }
        style = {{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch'
        }}
    > { searchBox } </form>;
    const itemComponents = items
        .filter(({ title }) => title.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a,b) => a.title.localeCompare(b.title))
        .map(({ id }) => <Item key={id} itemId={id}/>);
    const itemBox = <div
        style = {{
            backgroundColor: '#fffb',
            borderRadius: '0px 0px 3px 3px',
            paddingRight: '5px',
            marginTop: '5px',
        }}
    > { itemComponents } </div>
    
    return (
        <Body>
            { groupCaption }
            { searchForm }
            { itemBox }
        </Body>
    )
};