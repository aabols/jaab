import classNames from 'classnames';
import React, { forwardRef } from 'react';

const Icon = forwardRef(({ icon, title, disabled, onClick, active }, ref) => {
    const className = classNames('icon', {
        'icon--disabled': disabled,
        'icon--inverted': active,
    });
    return (
        <div
            className={className}
            onClick={onClick}
            title={title}
            children={icon}
            ref={ref}
        />
    );
});

export default Icon;
