import React from 'react';
import { useDispatch } from 'react-redux';
import { listActions } from '../../../../../_actions/list';

export default function ListSearchBox({ value, setValue }) {
    const dispatch = useDispatch();

    const handleSearchChange = (e) => {
        e.preventDefault();
        setValue(e.target.value);
    };

    const handleCreateList = (e) => {
        e.preventDefault();
        dispatch(listActions.createList({ title: value }));
        setValue('');
    };

    return (
        <form className='form form--medium' onSubmit={handleCreateList}>
            <input
                className='form__input'
                type='text'
                name='title'
                placeholder='Find or create'
                value={value}
                onChange={handleSearchChange}
            />
        </form>
    );
};
