import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import ListNavigation from './navigation';

export default function Lists() {
    useEffect(() => {
        document.title = 'Lists';
    }, []);

    return (
        <div id='lists' className='columnLayout'>
            <ListNavigation />
            <Outlet />
        </div>
    )
};
