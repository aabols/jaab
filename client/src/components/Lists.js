import React, { useEffect, useState } from 'react';

import { api } from '../api';

export default function Lists() {
    const [lists, setLists] = useState([]);
    useEffect(() => {
        api.get('/list').then(res => setLists([...res.data]));
    }, []);

    console.log(lists);

    const handleSubmit = (e) => {
        e.preventDefault();
        const title = e.target.title.value;
        api.post('/list', { title });
    };
    
    return (
        <div>
            <h1>Lists</h1>
            {lists.map(({ id, title }) => <div key={id}><b key={id}>{title}</b></div>)}
            <form onSubmit={handleSubmit}>
                <input key='title' type='text' name='title'/>
                <input key='submit' type='submit' value='add'/>
            </form>
        </div>
    )
};