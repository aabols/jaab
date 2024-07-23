import React, { useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { BsCheckCircleFill, BsCircle, BsFillCheckSquareFill, BsFillEyeFill, BsInfoCircle, BsPersonDashFill } from 'react-icons/bs';
import { AiFillEdit } from 'react-icons/ai';
import { RiVipCrownFill } from 'react-icons/ri';
import Popup from 'reactjs-popup';
import { listsServices } from '../../../../../../../_services/listsServices';
import Icon from '../../../../../../_shared/icon';
import UserInput from './userInput';
import { GoDiffAdded } from 'react-icons/go';

export default function SharePopup({ listId, ...props }) {
    const [listUsers, setListUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showInfo, setShowInfo] = useState();
    const { title, _role } = useSelector(state => {
        const { title, _role } = state.lists.find(l => l.id === listId);
        return { title, _role };
    }, shallowEqual);
    const me = useSelector(state => state.auth.user);

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
        listsServices.shareList(listId, user.username, 5)
            .then(({ data: newUser }) => {
                setListUsers(users => [...users, newUser]);
            });
    };
    const handleUnshare = (user) => (e) => {
        e.preventDefault();
        listsServices.unshareList(listId, user.username)
            .then(({ data: removedUser }) => {
                setListUsers(users => users.filter(u => u.username !== removedUser.username));
            });
    };
    const handleChangeRole = (user, role) => (e) => {
        e.preventDefault();
        listsServices.shareList(listId, user.username, role)
            .then(({ data: updatedUser }) => {
                setListUsers(users => users.map(u => u.username === updatedUser.username ? updatedUser : u));
            });
    };

    const roles = [
        ['Owner', 'Full access to the list, including deleting it altogether.', <RiVipCrownFill />],
        ['Collaborator', 'Only allowed to add and modify groups and items.', <GoDiffAdded />],
        ['Contributor', 'Only allowed to add and modify items.', <AiFillEdit />],
        ['Checker', 'Only allowed to check or uncheck items.', <BsFillCheckSquareFill />],
        ['Viewer', 'View only, not allowed to make any changes.', <BsFillEyeFill />],
    ];
    const roleIcons = roles.map((role, i) => (<Icon icon={role[2]} title={role[0]} />));
    const roleIcon = (hasRole) => hasRole ? <BsCheckCircleFill /> : <BsCircle />;

    const userTable = (
        <table style={{ borderCollapse: 'collapse' }}>
            <thead>
                <tr>
                    <th colSpan={2} />
                    <th colSpan={5}><Icon icon={<BsInfoCircle />} onClick={() => setShowInfo(true)} title='Help' /></th>
                </tr>
                <tr style={{ borderBottom: '1px solid' }}>
                    <th colSpan={2}>Users</th>
                    {roleIcons.map((roleIcon, i) => (
                        <th key={i} style={{ padding: '5px' }}>
                            {roleIcon}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {listUsers.sort((a, b) => a.username === me.username ? -1 : 0).map((user, i) => (
                    <tr key={i}>
                        <td>
                            <Icon
                                icon={<BsPersonDashFill />}
                                onClick={handleUnshare(user)}
                                disabled={user._role < _role}
                                title={`Remove ${user.firstName}`}
                            />
                        </td>
                        <td style={{ fontSize: '0.8em' }}>{`${user.firstName} ${user.lastName} (${user.username})`}</td>
                        {roles.map((r, i) => (
                            <td key={i}>
                                <Icon
                                    icon={roleIcon(user.username === me.username ? i + 1 === _role : i + 1 === user._role)}
                                    disabled={user.username === me.username || i + 1 < _role || user._role < _role}
                                    onClick={handleChangeRole(user, i + 1)}
                                    title={`Make ${user.firstName} a${!i ? 'n' : ''} ${r[0]}`}
                                />
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );

    const sharingPage = (
        <>
            <center style={{ fontWeight: 'bold', marginBottom: '1em' }}> {title} </center>
            {loading ? 'Loading...' : userTable}
            <UserInput excluded={listUsers} onSelect={handleShare} />
        </>
    );

    const infoPage = (
        <>
            <div> <span style={{ cursor: 'pointer' }} onClick={() => setShowInfo(false)}>{'< back'}</span> </div>
            <p style={{ maxWidth: '30em' }}>
                Use the grid to assign roles to users. You may only assign or remove roles not exceeding your own. You may not change your own role (but you can remove yourself from the list).
            </p>
            <p>
                The role options are as follows:
            </p>
            <table style={{ borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ borderBottom: '1px solid' }}>
                        <th colSpan={2}>Role</th><th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {roles.map((role, i) => (
                        <tr key={i}>
                            <td>{roleIcons[i]}</td>
                            <td style={{ paddingRight: '1em' }}>{role[0]}</td>
                            <td>{role[1]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );

    return (
        <Popup className='modal-popup' {...props}>
            {showInfo ? (
                infoPage
            ) : (
                sharingPage
            )}
        </Popup>
    );
};
