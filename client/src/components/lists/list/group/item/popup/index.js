import React from 'react';
import Popup from 'reactjs-popup';
import ItemForm from './form';

export default function ItemPopup({ open, setOpen, listId, groupId, itemId }) {
    return (
        <Popup className='modal-popup' open={open} onClose={() => setOpen(false)} >
            <ItemForm
                listId={listId}
                groupId={groupId}
                itemId={itemId}
                onDelete={() => setOpen(false)}
                onSubmit={() => setOpen(false)}
            />
        </Popup>
    );
};
