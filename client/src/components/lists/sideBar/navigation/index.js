import React, { useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import ListNavLink from './link';
import ListSearchBox from './search';

export default function ListNavigation({ onNavigate }) {
    const [searchQuery, setSearchQuery] = useState('');
    const lists = useSelector(state => state.lists
        .filter(list => list.title.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => a.title.localeCompare(b.title))
        .map(({ id }) => id), shallowEqual)
        .map(listId => <ListNavLink key={listId} listId={listId} onClick={(e) => onNavigate()} />);

    return (
        <div id='list-navigation'>
            <ListSearchBox value={searchQuery} setValue={setSearchQuery} />
            {lists}
        </div>
    );
};
