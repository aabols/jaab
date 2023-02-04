import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './Item.css';
import { listsActions } from '../../_actions/listsActions';

export default function Item({ itemId }) {
    const dispatch = useDispatch();
    const item = useSelector(state => state.lists.items)
        .find(item => item.id === itemId);

    const handleToggle = e => {
        e.preventDefault();
        dispatch(listsActions.updateItem({ ...item, checked: !item.checked }, item))
    };

    const handleRename = e => {
        e.preventDefault();
        const title = prompt(`Rename ${item.title}:`, item.title);
        if (title === null) return;
        if (!title) return dispatch(listsActions.deleteItem(item));
        dispatch(listsActions.updateItem({ ...item, title }, item));
    };

    return (
        <div className='listItem'>
            <input
                type = 'checkbox'
                checked = { item.checked }
                onChange = { handleToggle }
                onContextMenu = { handleRename }
            />
            <div onClick = { handleToggle } onContextMenu = { handleRename } >
                { item.title }
            </div>
        </div>
    );
};