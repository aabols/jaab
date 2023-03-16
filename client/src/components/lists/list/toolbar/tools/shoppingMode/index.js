import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { settingsConstants } from '../../../../../../_constants/settingsConstants';
import { RiShoppingCartFill, RiShoppingCartLine } from 'react-icons/ri';
import If from '../../../../../_shared/if';

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
        <div
            className={classNames({
                'icon': true,
                'icon--disabled': globalSearch
            })}
            onClick={handleToggleShoppingMode}
            title='Shopping mode'
        >
            <If condition={shoppingMode}>
                <RiShoppingCartFill />
            </If>
            <If condition={!shoppingMode}>
                <RiShoppingCartLine />
            </If>
        </div>
    )
};