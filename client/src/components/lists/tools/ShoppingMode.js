import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { listsConstants } from '../../../_constants/listsConstants';
import { RiShoppingCartFill, RiShoppingCartLine } from 'react-icons/ri';
import If from '../../If';

export default function ShoppingMode() {
    const dispatch = useDispatch();
    const shoppingMode = useSelector(state => state.lists.settings.shoppingMode);
    const globalSearch = useSelector(state => state.lists.settings.globalSearch);

    const handleToggleShoppingMode = (e) => {
        e.preventDefault();
        if (globalSearch) return;
        dispatch({
            type: listsConstants.SET_SHOPPING_MODE,
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