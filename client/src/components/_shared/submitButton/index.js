import React from 'react';

export default function SubmitButton({ value }) {
    return (
        <input
            className='form__button'
            type='submit'
            value={value}
        />
    );
};
