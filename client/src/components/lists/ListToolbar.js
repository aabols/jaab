import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './ListToolbar.css';
import { listsActions } from '../../_actions/listsActions';
import { sortOptions } from '../../utils/sortFunctions';
import { listsConstants } from '../../_constants/listsConstants';

const sortOptionKeys = Object.keys(sortOptions);

export default function ListToolbar({ list }) {
    const dispatch = useDispatch();
    const sortOption = useSelector(state => state.lists.settings.sortOption);
    const refreshRate = useSelector(state => state.lists.settings.refreshRate);

    const handleAddGroup = (e) => {
        const title = prompt(`New group in ${list.title}:`);
        if (title) dispatch(listsActions.createGroup({ listId: list.id, title }));
    };

    const handleSortChange = (e) => {
        e.preventDefault();
        dispatch({
            type: listsConstants.SET_SORT_OPTION,
            payload: e.target.value
        });
    };

    const handleRefreshChange = (e) => {
        e.preventDefault();
        dispatch({
            type: listsConstants.SET_REFRESH_RATE,
            payload: e.target.value
        });
    };

    const sortOptionElements = sortOptionKeys
        .map(opt => <option key={opt} value={opt}>{sortOptions[opt].title}</option>);

    return (
        <div id='ListToolbar'>
            <input type = 'button' value = '+' title = 'Add group' onClick = { handleAddGroup } />
            <select value={sortOption} onChange={handleSortChange}>
                { sortOptionElements }
            </select>
            <div id='RefreshRate'>
                <input
                    type = 'range'
                    min = '0'
                    max = '10'
                    onChange = { handleRefreshChange }
                    value = { refreshRate }
                    title = { `Refresh rate: ${refreshRate}` }
                />
            </div>
        </div>
    )
};