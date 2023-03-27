import { isCancel } from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { BsPersonDashFill } from 'react-icons/bs';
import Popup from 'reactjs-popup';
import useListUsers from '../../../../../../../hooks/useListUsers';
import { listsServices } from '../../../../../../../_services/listsServices';
import { userServices } from '../../../../../../../_services/userServices';
import Icon from '../../../../../../_shared/icon';
import SearchInput from '../../../../../../_shared/searchInput';
import Table from '../../../../../../_shared/table';
import RoleDropdown from './roleDropdown';

export default function SharePopup({ listId, ...props }) {
    //const [listUsers, reloadUsers, loading] = useListUsers(listId);
    const [listUsers, setListUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const roleRef = useRef();
    const roles = [
        { level: 1, name: 'Owner' },
        { level: 2, name: 'Collaborator' },
        { level: 3, name: 'Contributor' },
        { level: 4, name: 'Checker' },
        { level: 5, name: 'Viewer' },
    ];

    useEffect(() => {
        const newController = new AbortController();
        listsServices.getUsers(listId, { signal: newController.signal })
            .then(({ data: users }) => {
                setListUsers(users);
                setLoading(false);
            })
            .catch(err => { });

        return () => {
            newController.abort();
        };
    }, [listId]);

    const handleShare = (e, user) => {
        e.preventDefault();
        setListUsers(users => [...users, user]);
        listsServices.shareList(listId, user.username, roleRef.current.value)
            .catch(err => {
                setListUsers(users => users.filter(u => u.username !== user.username));
            });
    };
    const handleUnshare = (user) => (e) => {
        e.preventDefault();
        setListUsers(users => users.filter(u => u.username !== user.username));
        listsServices.unshareList(listId, user.username)
            .catch(err => {
                setListUsers(users => [...users, user]);
            });
    };
    const handleChangeRole = (user) => (e) => {
        e.preventDefault();
        listsServices.shareList(listId, user.username, e.target.value);
    };

    const finder = (query, setResults) => {
        const controller = new AbortController();
        userServices.searchUsers(query, controller.signal)
            .then(({ data: users }) => {
                setResults(users.filter(user => !listUsers.find(listUser => listUser.username === user.username)));
            })
            .catch(err => {
                if (!isCancel(err)) setResults([]);
            });
        return () => controller.abort();
    };
    const display = ({ username, firstName, lastName }) => `${username} (${firstName} ${lastName})`;

    const headings = [{ x: '' }, 'User', 'Role'];
    const contents = listUsers.map(user => ({
        x: <Icon icon={<BsPersonDashFill onClick={handleUnshare(user)} />} />,
        User: `${user.firstName} ${user.lastName} (${user.username})`,
        Role: <RoleDropdown onChange={handleChangeRole(user)} defaultLevel={user._role} />
    }));
    const userTable = <Table headings={headings} contents={contents} />;

    return (
        <Popup className='modal-popup' {...props}>
            <div> {listId} </div>
            <div>Shared with:</div>
            {loading ? 'Loading...' : userTable}
            <SearchInput
                id='share-user'
                label={<span>Add new {<RoleDropdown ref={roleRef} />}:</span>}
                finder={finder}
                display={display}
                onSelect={handleShare}
            />
        </Popup>
    );
};
