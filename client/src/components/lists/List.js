import React, { useEffect, useMemo, useRef } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Group from './Group';
import ListToolbar from './ListToolbar';
import { sortOptions } from '../../utils/sortFunctions';
import If from '../If';
import { listsActions } from '../../_actions/listsActions';

export default function List() {
    const { listId } = useParams();
    const dispatch = useDispatch();
    const lists = useSelector(state => state.lists.lists);
    const allGroups = useSelector(state => state.lists.groups);
    const allItems = useSelector(state => state.lists.items);
    const sortOptionKey = useSelector(state => state.lists.settings.sortOption);
    const shoppingMode = useSelector(state => state.lists.settings.shoppingMode);
    const globalSearch = useSelector(state => state.lists.settings.globalSearch);
    const refreshDelay = useSelector(state => state.lists.settings.listRefreshDelay);
    const refresh = useRef();
    const list = lists.find(list => list.id === listId);

    const requestRefresh = useMemo(() => {
        const scheduleRefresh = () => {
            refresh.current.schedule = setTimeout(requestRefresh, refreshDelay);
        };
        const requestRefresh = () => {
            refresh.current.request = dispatch(listsActions.refreshList(list, scheduleRefresh));
        };
        return requestRefresh;
    }, [dispatch, refreshDelay, list]);

    useEffect(() => {
        if (!list) return;
        refresh.current = {};
        list && requestRefresh();
        return () => {
            refresh.current.request.abort();
            clearTimeout(refresh.current.schedule);
        }
    }, [requestRefresh, list]);

    if (!list && lists.length > 0) return <Navigate to='..' />;

    const sortFunction = sortOptions[sortOptionKey].fn;
    const groups = allGroups.filter(group => group.listId === list.id);
    const items = allItems.filter(item => !!groups.find(group => group.id === item.groupId));
    const groupComponents = groups
        .map(group => ({ ...group, itemCount: items.filter(item => item.groupId === group.id && (!shoppingMode || !item.checked)).length }))
        .filter(({ itemCount }) => !shoppingMode || itemCount > 0)
        .filter(({ id }) => !globalSearch || items.some(({ groupId, title }) => groupId === id && title.toLowerCase().includes(globalSearch.toLowerCase())))
        .sort(sortFunction)
        .map(({ id }) => <Group key={id} groupId={id} />);

    return (
        <div id='List'>
            <If condition={list}>
                <ListToolbar list={list} />
            </If>
            <div id='list-groups' className='boardLayout'>
                {groupComponents}
            </div>
        </div>
    )
};