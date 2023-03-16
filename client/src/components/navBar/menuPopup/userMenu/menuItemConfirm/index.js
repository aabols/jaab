import classNames from 'classnames';
import React, { useState } from 'react';

export default function MenuItemConfirm({ onClick, value, confirmValue = 'Sure?', timeout = 1000 }) {
    const [confirm, setConfirm] = useState();
    const className = classNames(
        'menu__item',
        'menu__item--centered',
        'menu__item--clickable', {
        'menu__item--hoverable': !confirm,
        'menu__item--confirm': confirm,
    });

    const handleClick = (e) => {
        if (confirm) {
            clearTimeout(confirm);
            setConfirm(null);
            onClick(e);
        } else {
            e.preventDefault();
            const timeoutId = setTimeout(() => setConfirm(null), timeout);
            setConfirm(timeoutId);
        }
    };

    return (
        <div className={className} onClick={handleClick}>
            {confirm ? confirmValue : value}
        </div>
    );
};
