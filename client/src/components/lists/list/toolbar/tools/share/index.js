import React, { useState } from 'react';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import Icon from '../../../../../_shared/icon';
import SharePopup from './popup';

export default function ShareList({ listId }) {
    const [open, setOpen] = useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = (e) => {
        e.preventDefault();
        setOpen(true);
    };

    return (
        <>
            <Icon title='Share' icon={<BsFillPersonPlusFill onClick={handleOpen} />} />
            {open && <SharePopup listId={listId} open={open} onClose={handleClose} />}
        </>
    );
};
