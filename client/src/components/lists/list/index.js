import React, { useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { shallowEqual, useSelector } from 'react-redux';
import Group from './group';
import ListToolbar from './toolbar';
import { sortOptions } from '../../../utils/sortFunctions';
import If from '../../_shared/if';
import useThunkPolling from '../../../hooks/useThunkPolling';
import { listActions } from '../../../_actions/list';

export default function List() {
    const { listId } = useParams();
    const { listRefreshDelay } = useSelector(state => state.settings);
    const groupIDs = useSelector(state => {
        const { sortOption, shoppingMode, globalSearch } = state.settings;
        const sortFunction = sortOptions[sortOption].fn;
        return state.lists
            .find(l => l.id === listId)?.groups
            .filter(group =>
                (!shoppingMode || group.items.some(item => !item.checked))
                && (!globalSearch || group.items.some(item => item.title.toLowerCase().includes(globalSearch.toLowerCase()))))
            .sort(sortFunction)
            .map(group => group.id);
    }, shallowEqual);
    const thunkCreator = useCallback(
        (signal) => listActions.readList(listId, { signal }),
        [listId]
    );
    useThunkPolling(thunkCreator, listRefreshDelay);

    if (!groupIDs) return;
    const groupComponents = groupIDs
        .map(groupId => <Group key={groupId} listId={listId} groupId={groupId} />);

    return (
        <div id='List'>
            <If condition={listId}>
                <ListToolbar listId={listId} />
            </If>
            <div id='list-groups' className='boardLayout'>
                {groupComponents}
            </div>
        </div>
    );
};
