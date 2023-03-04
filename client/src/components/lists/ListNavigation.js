import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Popup from 'reactjs-popup';
import { listsActions } from '../../_actions/listsActions';
import If from '../If';
import ListForm from './ListForm';

export default function ListNavigation() {
    const dispatch = useDispatch();
    const [editList, setEditList] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const refreshDelay = useSelector(state => state.lists.settings.listsRefreshDelay);
    const refresh = useRef();

    const requestRefresh = useMemo(() => {
        const scheduleRefresh = () => {
            refresh.current.schedule = setTimeout(requestRefresh, refreshDelay);
        };
        const requestRefresh = () => {
            refresh.current.request = dispatch(listsActions.refreshLists(scheduleRefresh));
        };
        return requestRefresh;
    }, [dispatch, refreshDelay]);

    useEffect(() => {
        refresh.current = {};
        requestRefresh();
        return () => {
            refresh.current.request.abort();
            clearTimeout(refresh.current.schedule);
        }
    }, [requestRefresh]);

    const handleSearchChange = (e) => {
        e.preventDefault();
        setSearchQuery(e.target.value);
    };

    const handleCreateList = (e) => {
        e.preventDefault();
        dispatch(listsActions.createList({ title: searchQuery }));
        setSearchQuery('');
    };

    const handleEdit = (list) => {
        return (e) => {
            e.preventDefault();
            setEditList(list);
        };
    };

    const lists = useSelector(state => state.lists.lists)
        .filter(list => list.title.toLowerCase().includes(searchQuery.toLowerCase()))
        .sort((a, b) => a.title.localeCompare(b.title))
        .map(list => (
            <NavLink
                className='linkButton linkButton--border'
                key={list.id}
                to={list.id}
                onContextMenu={handleEdit(list)}
                children={list.title}
            />
        ));

    const listPopup = (
        <Popup
            className='modal-popup'
            open={!!editList}
            onClose={() => setEditList(null)}
            children={<ListForm
                list={editList}
                onUpdate={() => setEditList(null)}
                onDelete={() => setEditList(null)}
            />}
        />
    );

    return (
        <div id='list-navigation' className='justifiedColumn'>
            <form className='form form--medium' onSubmit={handleCreateList}>
                <input
                    className='form__input'
                    type='text'
                    name='title'
                    placeholder='Find or create'
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
            </form>
            {lists}
            <If condition={editList}>
                {listPopup}
            </If>
        </div>
    )
};