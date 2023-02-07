import React from 'react';

import './Toggle.css';

export default function Toggle({ on = false, toggle, caption = 'On/Off' }) {
    return (
        <div
            className = { `toggle${on ? ' active' : ''}` }
            onClick = { toggle }
        >
            { caption }
        </div>
    )
};