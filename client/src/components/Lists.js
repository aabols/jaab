import React, { useEffect, useState, useRef } from 'react';
import { Link, Outlet } from 'react-router-dom';

import { api } from '../api';

export default function Lists() {
    const [lists, setLists] = useState([]);
    const titleInput = useRef();
    useEffect(() => {
        refreshLists();
    }, []);

    const refreshLists = () => {
        api.get('/list').then(res => setLists(res.data));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const title = titleInput.current.value;
        titleInput.current.value = '';
        api.post('/list', { title }).then(() => {
            refreshLists();
        });
    };
    
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row'
        }}>
            <div>
                <h1>Lists</h1>
                {lists.map(({ id, title }) => <div key={id}>
                    <Link to={`${id}`}>{title}</Link>
                </div>)}
                <form onSubmit={handleSubmit}>
                    <input ref={titleInput} type='text' name='title' placeholder='New list'/>
                </form>
            </div>
            <Outlet/>
        </div>
    )
};