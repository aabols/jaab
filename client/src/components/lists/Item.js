import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsFillCheckSquareFill, BsSquare } from 'react-icons/bs';
import Popup from 'reactjs-popup';
import { listsActions } from '../../_actions/listsActions';
import If from '../If';
import classNames from 'classnames';
import ItemForm from './ItemForm';

export default function Item({ itemId }) {
    const [edit, setEdit] = useState(false);
    const dispatch = useDispatch();
    const item = useSelector(state => state.lists.items)
        .find(item => item.id === itemId);

    const handleToggle = e => {
        e.preventDefault();
        dispatch(listsActions.updateItem({ ...item, checked: !item.checked }, item))
    };

    const handleEdit = (e) => {
        e.preventDefault();
        setEdit(true);
    };

    const itemPopup = (
        <Popup
            className='modal-popup'
            open={edit}
            onClose={() => setEdit(false)}
            children={<ItemForm
                item={item}
                onDelete={() => setEdit(false)}
                onSubmit={() => setEdit(false)}
            />}
        />
    );

    return (
        <div className='item'>
            <div className='item__handle' onClick={handleToggle}>
                <If condition={!item.checked}>
                    <BsSquare />
                </If>
                <If condition={item.checked}>
                    <BsFillCheckSquareFill />
                </If>
            </div>
            <div
                className={classNames({
                    'item__caption': true,
                    'item__caption--checked': item.checked,
                })}
                onClick={handleToggle}
                onContextMenu={handleEdit}
            >
                {item.title}
            </div>
            {itemPopup}
        </div>
    );
};