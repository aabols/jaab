import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { settingsConstants } from '../../../../../../_constants/settingsConstants';
import { BiSearch } from 'react-icons/bi';
import Popup from 'reactjs-popup';
import { itemActions } from '../../../../../../_actions/item';
import { store } from '../../../../../../store';

export default function SearchList({ listId }) {
    const dispatch = useDispatch();
    const searchBoxRef = useRef();
    const globalSearch = useSelector(state => state.settings.globalSearch);

    const handleSearchChange = (e) => {
        e.preventDefault();
        if (e.target.value) {
            dispatch({
                type: settingsConstants.SET_SHOPPING_MODE,
                payload: false
            });
        };
        dispatch({
            type: settingsConstants.SET_GLOBAL_SEARCH,
            payload: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!globalSearch) return;
        const matchingItems = store.getState().lists
            .find(l => l.id === listId).groups
            .flatMap(g => g.items.map(i => ({ ...i, groupId: g.id })))
            .filter(({ title }) => title.toLowerCase().includes(globalSearch.toLowerCase()));
        const checked = matchingItems.some(({ checked }) => checked) ? false : true;
        matchingItems.forEach(({ groupId, ...item }) => {
            dispatch(itemActions.updateItem(listId, groupId, item.id, { checked }));
        });
    };

    const handleClosing = () => {
        dispatch({
            type: settingsConstants.SET_GLOBAL_SEARCH,
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
            keepTooltipInside={true}
        />
    )
};