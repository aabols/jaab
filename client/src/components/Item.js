import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listsActions } from '../_actions/listsActions';

const Body = ({ children }) => (
    <div style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'baseline',
    }}>
        { children }
    </div>
);

export default function Item({ itemId }) {
    const dispatch = useDispatch();
    const items = useSelector(state => state.lists.items);

    const item = items.find(item => item.id === itemId);

    const handleToggle = e => {
        e.preventDefault();
        dispatch(listsActions.changeItemLocal({ ...item, checked: !item.checked }))
    };
    const handleRename = e => {
        e.preventDefault();
        const title = prompt(`Rename ${item.title}:`, item.title);
        if (title === null) return;
        if (!title) return dispatch(listsActions.deleteItemLocal(item.id));
        dispatch(listsActions.changeItemLocal({ ...item, title }));
    }

    const itemCheckbox = <input
        type = 'checkbox'
        checked = { item.checked }
        onChange = { handleToggle }
        onContextMenu = { handleRename }
        style = {{
            cursor: 'pointer',
        }}
    />;
    const itemCaption = <div
        onClick = { handleToggle }
        onContextMenu = { handleRename }
        style = {{
            cursor: 'pointer',
        }}
    >
        { item.title }
    </div>;

    return (
        <Body>
            { itemCheckbox }
            { itemCaption }
        </Body>
    );
};