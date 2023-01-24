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

    const handleClick = (e, itemId) => {
        e.preventDefault();
        api.get(`/lists/${listId}/${groupId}/${itemId}`).then((res) => {
            console.log(res);
        });
    };

    const handleRightClick = (e, itemId) => {
        e.preventDefault();
        const item = items.find(item => item.id === itemId);
        const title = prompt(`Rename ${item.title}:`, item.title);
        console.log(`Deleting ${itemId}`)
        if (!title) return deleteItem(itemId);
        updateItem(itemId, { title });
    };

    const deleteItem = (itemId) => {
        api.delete(`/lists/${listId}/${groupId}/${itemId}`).then(() => refreshItems());
    };
    
    const updateItem = (itemId, newItem) => {
        api.put(`/lists/${listId}/${groupId}/${itemId}`, { ...newItem }).then(() => refreshItems())
    };

    const handleToggle = (e, itemId) => {
        e.preventDefault();
        const item = items.find(item => item.id === itemId);
        updateItem(itemId, { checked: !item.checked })
    };
    
    return (
        <div>
            <h3>Group {groupId}</h3>
            {items.map(({ id, title, checked }) => <div key={id}>
                <input type='checkbox' checked={checked} onChange={(e) => handleToggle(e, id)}/>
                <b
                    onClick={(e) => handleClick(e, id)}
                    onContextMenu={(e) => handleRightClick(e, id)}
                >{title}</b>
            </div>)}
            <form onSubmit={handleSubmit}>
                <input ref={titleInput} type='text' name='title' placeholder='New item'/>
            </form>
        </div>
    )
};