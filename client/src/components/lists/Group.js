import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './Group.css';
import Item from './Item';
import { listsActions } from '../../_actions/listsActions';
import { sortOptions } from '../../utils/sortFunctions';

export default function Group({ groupId }) {
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState('');
    const groups = useSelector(state => state.lists.groups);
    // items should be props?
    const allItems = useSelector(state => state.lists.items);

    const group = groups.find(group => group.id === groupId);
    const items = allItems.filter(item => item.groupId === group.id)
        .filter(({ title }) => title.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort(sortOptions.titleAZ.fn)
        .map(({ id }) => <Item key={id} itemId={id}/>);

    const handleRenameGroup = (e) => {
        e.preventDefault();
        const title = prompt(`Rename ${group.title}:`, group.title);
        if (title === null) return;
        if (!title) return dispatch(listsActions.deleteGroup(group));
        dispatch(listsActions.updateGroup({ ...group, title }, group));
    };

    const handleCreateItem = (e) => {
        e.preventDefault();
        const title = searchQuery;
        if (!title) return;
        setSearchQuery('');
        dispatch(listsActions.createItem({ listId: group.listId, groupId: group.id, title, checked: false }));
    };

    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <fieldset>
            <legend onContextMenu = { handleRenameGroup }>
                { group.title }
            </legend>
            <form onSubmit = { handleCreateItem }>
                <input
                    type = 'text'
                    name = 'title'
                    placeholder = 'Filter or create'
                    value = { searchQuery }
                    onChange = { handleSearchChange }
                />
            </form>
            <div className='listItems'>
                { items }
            </div>
        </fieldset>
        )
    };