import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { listsActions } from '../../_actions/listsActions';
import classNames from 'classnames'

export default function ListForm({ list, onUpdate, onDelete }) {
    const titleRef = useRef();
    const [confirmDelete, setConfirmDelete] = useState(false);
    const dispatch = useDispatch();

    const handleSave = (e) => {
        e.preventDefault();
        const title = titleRef.current.value;
        if (!title) return;
        dispatch(listsActions.updateList({
            ...list,
            title
        }, list));
        onUpdate();
    };

    const handleDeleteList = (e) => {
        e.preventDefault();
        if (!confirmDelete) {
            setConfirmDelete(true);
            setTimeout(() => setConfirmDelete(false), 1000);
            return;
        }
        dispatch(listsActions.deleteList(list));
        onDelete();
    };

    return (
        <form className='form form--wide' onSubmit={handleSave}>
            <div className='form__field'>
                <label htmlFor='title'>
                    Rename list:
                </label>
                <input
                    className='form__input'
                    type='text'
                    name='title'
                    id='title'
                    defaultValue={list.title}
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
                        'form__confirmButton--hover': !confirmDelete,
                        'form__confirmButton--confirm': confirmDelete
                    })}
                    type='button'
                    value={confirmDelete ? 'Confirm delete' : 'Delete list'}
                    onClick={handleDeleteList}
                />
            </div>
        </form>
    )
};