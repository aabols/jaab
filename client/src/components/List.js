import React, { useEffect, useState, useRef } from 'react';
import { useParams, Link, Outlet } from 'react-router-dom';
import { api } from '../api';

export default function List() {
    const [groups, setGroups] = useState([]);
    const { listId } = useParams();
    const titleInput = useRef();
    useEffect(() => {
        setGroups([]);
        refreshGroups();
    }, [listId]);

    const refreshGroups = () => {
        api.get(`/list/${listId}`).then(res => {
            res.data && setGroups(res.data);
        });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const title = titleInput.current.value;
        titleInput.current.value = '';
        api.post(`/list/${listId}`, { title }).then(() => {
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
                    <Link to={`${id}`}>{title}</Link>
                </div>)}
                <form onSubmit={handleSubmit}>
                    <input ref={titleInput} type='text' name='title' placeholder='New group'/>
                </form>
            </div>
            <Outlet/>
        </div>
    )
};