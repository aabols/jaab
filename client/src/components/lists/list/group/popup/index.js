import React from 'react';
import Popup from 'reactjs-popup';
import GroupForm from './form';

export default function GroupPopup({ open, setOpen, listId, groupId }) {
    return (
        <Popup className='modal-popup' open={open} onClose={() => setOpen(false)} >
            <GroupForm
                listId={listId}
                groupId={groupId}
                onDelete={() => setOpen(false)}
                onUpdate={() => setOpen(false)}
            />
        </Popup>
    );
};
