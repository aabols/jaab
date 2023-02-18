import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { listsActions } from '../../_actions/listsActions';
import classNames from 'classnames';

export default function GroupForm({ group, onDelete, onUpdate }) {
    const dispatch = useDispatch();
    const titleRef = useRef();
    const [confirmDelete, setConfirmDelete] = useState(false);

    const handleRename = (e) => {
        e.preventDefault();
        const title = titleRef.current.value;
        if (!title) return;
        dispatch(listsActions.updateGroup({ ...group, title }, group));
        onUpdate();
    };

    const handleDelete = (e) => {
        e.preventDefault();
        if (confirmDelete) {
            dispatch(listsActions.deleteGroup(group));
            onDelete();
            return;
        };
        setConfirmDelete(true);
        setTimeout(() => setConfirmDelete(false), 1000);
    };

    return (
        <form className='form form--wide' onSubmit={handleRename}>
            <div className='form__field'>
                <legend htmlFor='title'>
                    Group title:
                </legend>
                <input
                    className='form__input'
                    type='text'
                    defaultValue={group.title}
                    ref={titleRef}
                />
            </div>
            <div className='form__field'>
                <input
                    className='form__button'
                    type='submit'
                    value='Save'
                />
                <input
                    className={classNames({
                        'form__confirmButton': true,
                        'form__confirmButton--confirm': confirmDelete,
                        'form__confirmButton--hover': !confirmDelete,
                    })}
                    type='button'
                    value={confirmDelete ? 'Confirm delete' : 'Delete group'}
                    onClick={handleDelete}
                />
            </div>
        </form>
    )
};