import React, { useCallback, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { listActions } from '../../../_actions/list';
import useThunkPolling from '../../../hooks/useThunkPolling';
import ListNavLink from './link';
import ListSearchBox from './search';

export default function ListNavigation() {
    const [searchQuery, setSearchQuery] = useState('');
    const refreshDelay = useSelector(state => state.settings.listsRefreshDelay);
    const thunkCreator = useCallback((signal) => listActions.readLists({ signal }), []);
    useThunkPolling(thunkCreator, refreshDelay);
    const lists = useSelector(state => state.lists
        .filter(list => list.title.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => a.title.localeCompare(b.title))
        .map(({ id }) => id), shallowEqual)
        .map(listId => <ListNavLink key={listId} listId={listId} />);

    return (
        <div id='list-navigation' className='justifiedColumn'>
            <ListSearchBox value={searchQuery} setValue={setSearchQuery} />
            {lists}
        </div>
    );
};
