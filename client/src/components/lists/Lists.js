import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { listsActions } from '../../_actions/listsActions';
import ListNavigation from './ListNavigation';
import './Lists.css';

export default function Lists() {
    const dispatch = useDispatch();
    const refreshRate = useSelector(state => state.lists.settings.refreshRate);

    useEffect(() => {
        if (refreshRate < 1) return;
        dispatch(listsActions.reloadLists(Math.floor(10000 / refreshRate)));
        return () => dispatch(listsActions.stopReloadLists());
    }, [refreshRate]);

    return (
        <div id='Lists'>
            <ListNavigation/>
            <Outlet/>
        </div>
    )
};