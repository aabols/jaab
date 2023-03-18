import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listActions } from '../../../../../../../_actions/list';
import ConfirmButton from '../../../../../../_shared/confirmButton';
import SubmitButton from '../../../../../../_shared/submitButton';
import TextInput from '../../../../../../_shared/textInput';

export default function ListForm({ listId, onUpdate, onDelete }) {
    const titleRef = useRef();
    const dispatch = useDispatch();
    const title = useSelector(state => state.lists.find(l => l.id === listId).title);

    const handleSubmit = (e) => {
        e.preventDefault();
        const title = titleRef.current.value;
        if (!title) return;
        dispatch(listActions.updateList(listId, { title }));
        onUpdate();
    };

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(listActions.deleteList(listId));
        onDelete();
    };

    return (
        <form className='form form--wide' onSubmit={handleSubmit}>
            <div className='form__field'>
                <TextInput
                    id='list-title'
                    defaultValue={title}
                    label='List title:'
                    ref={titleRef}
                />
            </div>
            <div className='form__field'>
                <SubmitButton value='Save' />
                <ConfirmButton value='Delete list' onClick={handleDelete} />
            </div>
        </form>
    )
};