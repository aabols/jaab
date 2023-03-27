import classNames from 'classnames';
import React from 'react';

export default function MenuItem({ children, onClick }) {
    const className = classNames('menu__item', {
        'menu__item--hoverable': onClick,
        'menu__item--clickable': onClick,
    });

    return (
        <div className={className} onClick={onClick}>
            {children}
        </div>
    );
};
