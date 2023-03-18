import React, { forwardRef } from 'react';

const NumberInput = forwardRef(({ label, id, ...props }, ref) => {
    return (
        <>
            <legend htmlFor={id}>
                {label}
            </legend>
            <input
                className='form__input'
                type='number'
                id={id}
                ref={ref}
                {...props}
            />
        </>
    );
});

export default NumberInput;
