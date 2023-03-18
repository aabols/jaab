import React, { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import useThunkPolling from '../../hooks/useThunkPolling';
import { listActions } from '../../_actions/list';
import SideBar from './sideBar';

export default function Lists() {
    const refreshDelay = useSelector(state => state.settings.listsRefreshDelay);
    const thunkCreator = useCallback((signal) => listActions.readLists({ signal }), []);
    useThunkPolling(thunkCreator, refreshDelay);

    useEffect(() => {
        document.title = 'Lists';
    }, []);

    return (
        <div id='lists'>
            <SideBar />
            <Outlet />
        </div>
    )
};
