import React from 'react';

export default function Button({ value, onClick }) {
    return (
        <input
            className='form__button'
            type='button'
            value={value}
            onClick={onClick}
        />
    );
};
