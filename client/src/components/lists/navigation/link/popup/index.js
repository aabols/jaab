import React from 'react';
import Popup from 'reactjs-popup';
import ListForm from './form';

export default function ListPopup({ open, setOpen, listId }) {
    return (
        <Popup className='modal-popup' open={open} onClose={() => setOpen(false)} >
            <ListForm
                listId={listId}
                onDelete={() => setOpen(false)}
                onUpdate={() => setOpen(false)}
            />
        </Popup>
    );
};
