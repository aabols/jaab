import React, { memo, useState } from 'react';
import classNames from 'classnames';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { BsFillCheckSquareFill, BsSquare } from 'react-icons/bs';
import { itemActions } from '../../../../../_actions/item';
import ItemPopup from './popup';

export default memo(Item);

function Item({ listId, groupId, itemId }) {
    const [edit, setEdit] = useState(false);
    const dispatch = useDispatch();
    const item = useSelector(state => state.lists.find(l => l.id === listId).groups.find(g => g.id === groupId).items.find(i => i.id === itemId), shallowEqual);

    const handleToggle = e => {
        e.preventDefault();
        dispatch(itemActions.updateItem(listId, groupId, itemId, { checked: !item.checked }));
    };

    const handleEdit = (e) => {
        e.preventDefault();
        setEdit(true);
    };

    return (
        <div className='item'>
            <div className='item__handle' onClick={handleToggle}>
                {item.checked ? <BsFillCheckSquareFill /> : <BsSquare />}
            </div>
            <div
                className={classNames('item__caption', { 'item__caption--checked': item.checked })}
                onClick={handleToggle}
                onContextMenu={handleEdit}
                children={item.title}
            />
            <ItemPopup
                listId={listId}
                groupId={groupId}
                itemId={itemId}
                open={edit}
                setOpen={setEdit}
            />
        </div>
    );
};
