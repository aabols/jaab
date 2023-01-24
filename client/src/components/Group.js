import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../api';

export default function Group() {
    const [items, setItems] = useState([]);
    const { listId, groupId } = useParams();
    const titleInput = useRef();
    useEffect(() => {
        setItems([]);
        refreshItems();
    }, [groupId]);

    const refreshItems = () => {
        api.get(`/lists/${listId}/${groupId}`).then(res => {
            res.data && setItems(res.data.ListItems);
        });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const title = titleInput.current.value;
        titleInput.current.value = '';
        api.post(`/lists/${listId}/${groupId}`, { title }).then(() => {
            refreshItems();
        });
    };
    
    return (
        <div>
            <h3>Group {groupId}</h3>
            {items.map(({ id, title }) => <div key={id}>
                <b>{title}</b>
            </div>)}
            <form onSubmit={handleSubmit}>
                <input ref={titleInput} type='text' name='title' placeholder='New item'/>
            </form>
        </div>
    )
};