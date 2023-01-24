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
        api.get('/lists').then(res => setLists(res.data));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const title = titleInput.current.value;
        titleInput.current.value = '';
        api.post('/lists', { title }).then(() => {
            refreshLists();
        });
    };

    const handleRightClick = (e, id) => {
        e.preventDefault();
        const list = lists.find(list => list.id === id);
        const title = prompt(`Rename ${list.title}:`, list.title);
        if (!title) return api.delete(`/lists/${id}`).then(() => refreshLists());
        api.put(`/lists/${id}`, { title }).then((res) => {
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
                    <Link to={`${id}`} onContextMenu={(e) => handleRightClick(e, id)}>{title}</Link>
                </div>)}
                <form onSubmit={handleSubmit}>
                    <input ref={titleInput} type='text' name='title' placeholder='New list'/>
                </form>
            </div>
            <Outlet/>
        </div>
    )
};