import React from 'react';

export default function If({ condition, children }) {
    return (
        <>
            {condition ? children : null}
        </>
    )
};
