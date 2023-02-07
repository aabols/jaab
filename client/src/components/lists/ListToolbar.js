import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Popup from 'reactjs-popup';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import { GoDiffAdded } from 'react-icons/go';
import { BiSearch } from 'react-icons/bi';
import { RiShoppingCartFill, RiShoppingCartLine } from 'react-icons/ri';

import './ListToolbar.css';
import { listsActions } from '../../_actions/listsActions';
import { sortOptions } from '../../utils/sortFunctions';
import { listsConstants } from '../../_constants/listsConstants';
import ListSharing from './ListSharing';

const sortOptionKeys = Object.keys(sortOptions);

export default function ListToolbar({ list }) {
    const dispatch = useDispatch();
    const globalSearchRef = useRef();
    const [sharingOpen, setSharingOpen] = useState(false);
    const [searchVisible, setSearchVisible] = useState(false);
    const sortOption = useSelector(state => state.lists.settings.sortOption);
    const shoppingMode = useSelector(state => state.lists.settings.shoppingMode);
    const globalSearch = useSelector(state => state.lists.settings.globalSearch);
    const sortMenuRef = useRef();

    useEffect(() => {
        if (!searchVisible) {
            dispatch({
                type: listsConstants.SET_GLOBAL_SEARCH,
                payload: ''
            });
            return;
        };
        setTimeout(() => {
            globalSearchRef.current.focus();
        }, 500);
    }, [searchVisible]);

    const sortIcon = <div className='icon' key={sortOption} title={sortOptions[sortOption].title}> { sortOptions[sortOption].icon() } </div>
    const sortIcons = sortOptionKeys
        .filter(opt => opt !== sortOption)
        .map(opt => (
            <div className='icon' key={opt} style={{cursor: 'pointer'}} title={sortOptions[opt].title} onClick={e => {
                dispatch({
                    type: listsConstants.SET_SORT_OPTION,
                    payload: opt
                });
                sortMenuRef.current.close();
            }}> { sortOptions[opt].icon() } </div>
        ));

    const handleAddGroup = (e) => {
        const title = prompt(`New group in ${list.title}:`);
        if (title) dispatch(listsActions.createGroup({ listId: list.id, title }));
    };

    const handleToggleShoppingMode = (e) => {
        e.preventDefault();
        dispatch({
            type: listsConstants.SET_SHOPPING_MODE,
            payload: !shoppingMode
        });
    };

    const handleShare = (e) => {
        e.preventDefault();
        setSharingOpen(true);
    };

    const handleToggleSearch = (e) => {
        e.preventDefault();
        setSearchVisible(visible => !visible);
    };

    const handleSearchChange = (e) => {
        e.preventDefault();
        dispatch({
            type: listsConstants.SET_GLOBAL_SEARCH,
            payload: e.target.value
        });
    };

    const handleClearSearch = (e) => {
        e.preventDefault();
        dispatch({
            type: listsConstants.SET_GLOBAL_SEARCH,
            payload: ''
        });
    };
    
    const sharingPopup = useMemo(() => <ListSharing list={list}/>, [list?.id]);

    return (
        <div id='ListToolbar'>
            <div className='icon' onClick={handleAddGroup}> <GoDiffAdded title='Add group'/> </div>
            <div className='icon' onClick={handleShare}> <BsFillPersonPlusFill title='Share'/> </div>
            <div className='icon' onClick={handleToggleShoppingMode} title='Shopping mode'>
                { shoppingMode ? <RiShoppingCartFill/> : <RiShoppingCartLine/> }
            </div>
            <Popup
                trigger = { sortIcon }
                ref = {sortMenuRef}
                arrow = { false }
                overlayStyle = {{ display: 'none' }}
                position = 'bottom center'
            >
                <div style={{
                    backgroundColor: 'white',
                    fontSize: '1.5em',
                    border: '1px solid black',
                    borderRadius: '2px',
                    padding: '3px',
                }}>
                    { sortIcons }
                </div>
            </Popup>
            <Popup
                open = {sharingOpen}
                onClose = {() => setSharingOpen(false)}
                closeOnDocumentClick = {true}
            >
                {sharingPopup}
            </Popup>
            <div className='tool'>
                <div className='icon' onClick={handleToggleSearch}> <BiSearch title='Search in list'/> </div>
                <form className={`flexSearch${searchVisible ? ' visible' : ''}`}>
                    <input
                        type = 'text'
                        ref = {globalSearchRef}
                        onChange = {handleSearchChange}
                        value = {globalSearch}
                        placeholder = 'Search in list'
                        onFocus = {handleClearSearch}
                    />
                </form>
            </div>
        </div>
    )
};