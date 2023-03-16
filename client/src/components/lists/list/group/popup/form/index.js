import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { groupActions } from '../../../../../../_actions/group';
import ConfirmButton from '../../../../../_shared/confirmButton';
import TextInput from '../../../../../_shared/textInput';
import SubmitButton from '../../../../../_shared/submitButton';

export default function GroupForm({ listId, groupId, onDelete, onUpdate }) {
    const dispatch = useDispatch();
    const titleRef = useRef();
    const title = useSelector(state => state.lists.find(l => l.id === listId).groups.find(g => g.id === groupId).title);

    const handleSubmit = (e) => {
        e.preventDefault();
        const title = titleRef.current.value;
        if (!title) return;
        dispatch(groupActions.updateGroup(listId, groupId, { title }));
        onUpdate();
    };

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(groupActions.deleteGroup(listId, groupId));
        onDelete();
    };

    return (
        <form className='form form--wide' onSubmit={handleSubmit}>
            <div className='form__field'>
                <TextInput
                    id='group-title'
                    defaultValue={title}
                    label='Group title:'
                    ref={titleRef}
                />
            </div>
            <div className='form__field'>
                <SubmitButton value='Save' />
                <ConfirmButton value='Delete group' onClick={handleDelete} />
            </div>
        </form>
    )
};
