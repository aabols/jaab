import React from 'react';

export default function Menu({ children: items }) {
    const separator = <div className='menu__divider'></div>
    const menu = items.flatMap(item => [
        item,
        separator,
    ]).slice(0, -1);

    return (
        <div className='menu'>
            {menu}
        </div>
    );
};
