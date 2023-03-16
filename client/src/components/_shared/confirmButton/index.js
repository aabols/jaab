import classNames from 'classnames';
import React, { useState } from 'react';

export default function ConfirmButton({ value, confirmValue = 'Sure?', onClick = (e) => { }, timeout = 1000 }) {
    const [confirm, setConfirm] = useState();
    const handleClick = (e) => {
        e.preventDefault();
        if (!confirm) {
            const tid = setTimeout(() => setConfirm(null), timeout);
            setConfirm(tid);
        } else {
            clearTimeout(confirm);
            setConfirm(null);
            onClick(e);
        }
    };
    const className = classNames('form__confirmButton', {
        'form__confirmButton--hover': !confirm,
        'form__confirmButton--confirm': confirm,
    });

    return (
        <input
            className={className}
            type='button'
            value={confirm ? confirmValue : value}
            onClick={handleClick}
        />
    );
};
