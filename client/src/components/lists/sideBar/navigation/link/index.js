import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import ListPopup from './popup';

export default function ListNavLink({ listId, onClick }) {
    const [edit, setEdit] = useState(false);
    const title = useSelector(state => state.lists.find(list => list.id === listId).title);

    const handleEdit = (e) => {
        e.preventDefault();
        setEdit(true);
    };

    return (
        <>
            <NavLink
                className='linkButton linkButton--border'
                key={listId}
                to={listId}
                onContextMenu={handleEdit}
                children={title}
                onClick={onClick}
            />
            <ListPopup
                listId={listId}
                open={edit}
                setOpen={setEdit}
            />
        </>
    );
};
