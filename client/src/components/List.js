import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, Outlet } from 'react-router-dom';
import { api } from '../api';

export default function List() {
    const [groups, setGroups] = useState([]);
    const { listId } = useParams();
    const titleInput = useRef();
    const emailInput = useRef();
    useEffect(() => {
        setGroups([]);
        refreshGroups();
    }, [listId]);

    const refreshGroups = () => {
        api.get(`/lists/${listId}`).then(res => {
            res.data && setGroups(res.data.ListGroups);
        });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const title = titleInput.current.value;
        titleInput.current.value = '';
        api.post(`/lists/${listId}`, { title }).then(() => {
            refreshGroups();
        });
    };

    const handleSubmitShare = (e) => {
        e.preventDefault();
        const email = emailInput.current.value;
        emailInput.current.value = '';
        api.put(`/lists/${listId}/share`, { email }).then((res) => {
        });
    };
    
    const handleRightClick = (e, id) => {
        e.preventDefault();
        const group = groups.find(group => group.id === id);
        const title = prompt(`Rename ${group.title}:`, group.title);
        api.put(`/lists/${listId}/${id}`, { title }).then((res) => {
            refreshGroups();
        });
    };
    
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row'
        }}>
            <div>
                <h2>List {listId}</h2>
                {groups.map(({ id, title }) => <div key={id}>
                    <Link to={`${id}`} onContextMenu={(e) => handleRightClick(e, id)}>{title}</Link>
                </div>)}
                <form onSubmit={handleSubmit}>
                    <input ref={titleInput} type='text' name='title' placeholder='New group'/>
                </form>
                <form onSubmit={handleSubmitShare}>
                    <input ref={emailInput} type='text' name='email' placeholder='Share with (e-mail)'/>
                </form>
            </div>
            <Outlet/>
        </div>
    )
};