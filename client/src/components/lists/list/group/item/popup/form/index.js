import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { itemActions } from '../../../../../../../_actions/item';
import Button from '../../../../../../_shared/button';
import SubmitButton from '../../../../../../_shared/submitButton';
import TextInput from '../../../../../../_shared/textInput';

export default function ItemForm({ listId, groupId, itemId, onDelete, onSubmit }) {
    const dispatch = useDispatch();
    const titleRef = useRef();
    const title = useSelector(state => state.lists.find(l => l.id === listId).groups.find(g => g.id === groupId).items.find(i => i.id === itemId).title);

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(itemActions.deleteItem(listId, groupId, itemId));
        onDelete();
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const title = titleRef.current.value;
        if (!title) return;
        dispatch(itemActions.updateItem(listId, groupId, itemId, { title }));
        onSubmit();
    };

    return (
        <form className='form form--wide' onSubmit={handleUpdate}>
            <div className='form__field'>
                <TextInput
                    id='item-title'
                    defaultValue={title}
                    label='Item title:'
                    ref={titleRef}
                />
            </div>
            <div className='form__field'>
                <SubmitButton value='Save' />
                <Button value='Delete item' onClick={handleDelete} />
            </div>
        </form>
    )
};
