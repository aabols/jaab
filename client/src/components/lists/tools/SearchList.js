import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listsConstants } from '../../../_constants/listsConstants';
import { BiSearch } from 'react-icons/bi';
import Popup from 'reactjs-popup';
import { listsActions } from '../../../_actions/listsActions';

export default function SearchList({ list }) {
    const dispatch = useDispatch();
    const allItems = useSelector(state => state.lists.items);
    const searchBoxRef = useRef();
    const globalSearch = useSelector(state => state.lists.settings.globalSearch);

    const handleSearchChange = (e) => {
        e.preventDefault();
        if (e.target.value) {
            dispatch({
                type: listsConstants.SET_SHOPPING_MODE,
                payload: false
            });
        };
        dispatch({
            type: listsConstants.SET_GLOBAL_SEARCH,
            payload: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const matchingItems = allItems
            .filter(({ listId, title }) => listId === list.id && title.toLowerCase().includes(globalSearch.toLowerCase()));
        const checked = matchingItems.some(({ checked }) => checked) ? false : true;
        matchingItems.forEach(item => {
            dispatch(listsActions.updateItem({ ...item, checked }, item));
        });
    };

    const handleClosing = () => {
        dispatch({
            type: listsConstants.SET_GLOBAL_SEARCH,
            payload: ''
        });
    };

    const trigger = (
        <div className='icon' title='Search in list'>
            <BiSearch />
        </div>
    );

    const body = (
        <div className='menu'>
            <form className='form form--wide' onSubmit={handleSubmit}>
                <input
                    className='form__input'
                    type='text'
                    ref={searchBoxRef}
                    onChange={handleSearchChange}
                    value={globalSearch}
                    placeholder='Search in list'
                />
            </form>
        </div>
    );

    return (
        <Popup
            className='menu__popup'
            trigger={trigger}
            children={body}
            arrow={false}
            position='center center'
            onClose={handleClosing}
            closeOnDocumentClick={!globalSearch}
        />
    )
};