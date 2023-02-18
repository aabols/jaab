import React, { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { listsActions } from '../../_actions/listsActions';

export default function ItemForm({ item, onDelete, onSubmit }) {
    const dispatch = useDispatch();
    const titleRef = useRef();

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(listsActions.deleteItem(item));
        onDelete();
    };

    const handleUpdate = (e) => {
        e.preventDefault();
        const title = titleRef.current.value;
        if (!title) return;
        dispatch(listsActions.updateItem({ ...item, title }, item));
        onSubmit();
    };

    return (
        <form className='form form--wide' onSubmit={handleUpdate}>
            <div className='form__field'>
                <label htmlFor='title'>
                    Item title:
                </label>
                <input
                    className='form__input'
                    type='text'
                    ref={titleRef}
                    defaultValue={item.title}
                />
            </div>
            <div className='form__field'>
                <input
                    className='form__button'
                    type='submit'
                    value='Save'
                />
                <input
                    className='form__button'
                    type='button'
                    value='Delete item'
                    onClick={handleDelete}
                />
            </div>
        </form>
    )
};