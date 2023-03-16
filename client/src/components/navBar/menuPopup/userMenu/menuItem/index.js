import classNames from 'classnames';
import React from 'react';

export default function MenuItem({ onClick, children }) {
    const className = classNames('menu__item', 'menu__item--centered', {
        'menu__item--clickable': onClick,
        'menu__item--hoverable': onClick,
    });
    return (
        <div className={className} onClick={onClick}>
            {children}
        </div>
    );
};
