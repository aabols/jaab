import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { listsActions } from '../../_actions/listsActions';

export default function ListNavigation() {
    const [searchQuery, setSearchQuery] = useState('');
    const dispatch = useDispatch();

    const handleSearchChange = (e) => {
        e.preventDefault();
        setSearchQuery(e.target.value);
    };

    const handleCreateList = (e) => {
        e.preventDefault();
        dispatch(listsActions.createList({ title: searchQuery }));
        setSearchQuery('');
    };

    const handleRenameList = (e, list) => {
        e.preventDefault();
        const title = prompt(`Rename ${list.title}:`, list.title);
        if (title === null) return;
        if (!title) return dispatch(listsActions.deleteList(list));
        dispatch(listsActions.updateList({ ...list, title }));
    }

    const lists = useSelector(state => state.lists.lists)
        .filter(list => list.title.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => a.title.localeCompare(b.title))
        .map(list => (
            <NavLink
                className = 'linkButton linkButton--border'
                key = {list.id}
                to = {list.id}
                onContextMenu = { (e) => handleRenameList(e, list) }
            >
                { list.title }
            </NavLink>
        ));
    
    return (
        <div id='list-navigation' className='justifiedColumn'>
            <form className='form form--medium' onSubmit={handleCreateList}>
                <input
                    className = 'form__input'
                    type = 'text'
                    name = 'title'
                    placeholder = 'Find or create'
                    value = { searchQuery }
                    onChange = { handleSearchChange }
                />
            </form>
            { lists }
        </div>
    )
};