import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { settingsConstants } from '../../../../../../_constants/settingsConstants';
import { RiShoppingCartFill, RiShoppingCartLine } from 'react-icons/ri';
import Icon from '../../../../../_shared/icon';

export default function ShoppingMode() {
    const dispatch = useDispatch();
    const { shoppingMode, globalSearch } = useSelector(state => state.settings);

    const handleToggleShoppingMode = (e) => {
        e.preventDefault();
        if (globalSearch) return;
        dispatch({
            type: settingsConstants.SET_SHOPPING_MODE,
            payload: !shoppingMode
        });
    };

    return (
        <Icon
            icon={shoppingMode ? <RiShoppingCartFill /> : <RiShoppingCartLine />}
            title='Shopping mode'
            disabled={globalSearch}
            onClick={handleToggleShoppingMode}
        />
    )
};