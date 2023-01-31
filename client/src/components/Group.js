import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { listsActions } from '../_actions/listsActions';
import Item from './Item';

const Body = ({ children, theme }) => (
    <fieldset style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        padding: '0 10px 10px 10px',
        color: '#555',
        borderWidth: '2px',
        borderStyle: 'solid',
        borderColor: theme[0],
        borderRadius: '7px',
    }}>
        { children }
    </fieldset>
);

export default function Group({ groupId }) {
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState('');
    const groups = useSelector(state => state.lists.groups);
    const allItems = useSelector(state => state.lists.items);
    const theme = useSelector(state => state.theme.selectedTheme);

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
        if (!title) return;
        setSearchQuery('');
        dispatch(listsActions.createItemLocal({ groupId: group.id, title, checked: false }));
    };
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    const groupCaption = <legend
        onContextMenu = { handleRenameGroup }
        style = {{
            textAlign: 'center',
            fontSize: '1.2em',
            marginBottom: '5px',
            padding: '0px 10px 0.3em 10px',
            color: theme[0],
            borderRadius: '7px',
        }}
    > { group.title } </legend>;
    const searchBox = <input
        type = 'text'
        name = 'title'
        placeholder = 'Filter or create'
        value = { searchQuery }
        onChange = { handleSearchChange }
        style = {{
            fontSize: '1em',
            color: theme[0],
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
        <Body theme={theme}>
            { groupCaption }
            { searchForm }
            { itemBox }
        </Body>
    )
};