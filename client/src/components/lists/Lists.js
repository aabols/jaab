import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { listsActions } from '../../_actions/listsActions';
import ListNavigation from './ListNavigation';

export default function Lists() {
    const dispatch = useDispatch();
    const refreshRate = useSelector(state => state.lists.settings.refreshRate);

    useEffect(() => {
        document.title = 'Lists';
    }, []);

    useEffect(() => {
        if (refreshRate < 1) return;
        dispatch(listsActions.reloadLists(Math.floor(10000 / refreshRate)));
        return () => dispatch(listsActions.stopReloadLists());
    }, [refreshRate, dispatch]);

    return (
        <div id='lists' className='columnLayout'>
            <div className='columnLayout__fixedColumn'>
                <ListNavigation />
            </div>
            <div className='columnLayout__growColumn'>
                <Outlet />
            </div>
        </div>
    )
};