import React, { forwardRef } from 'react';

const TextInput = forwardRef(({ id, defaultValue, label }, ref) => {
    return (
        <>
            <legend htmlFor={id}>
                {label}
            </legend>
            <input
                className='form__input'
                type='text'
                id={id}
                defaultValue={defaultValue}
                ref={ref}
            />
        </>
    );
});

export default TextInput;
