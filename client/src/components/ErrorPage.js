import React from 'react';
import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
    const error = useRouteError();
    console.log(error);
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'start', alignItems: 'center' }}>
            <h1>Something went wrong...</h1>
            <p>
                {error.status} {error.statusText} {error.message}
            </p>
        </div>
    )
};