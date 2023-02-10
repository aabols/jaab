import { isCancel } from 'axios';
import React, { useEffect, useState } from 'react';
import { BsFillPersonPlusFill, BsPersonDashFill, BsPersonFill } from 'react-icons/bs';
import Popup from 'reactjs-popup';
import classNames from 'classnames';
import { validators } from '../../../utils/validators';
import { listsServices } from '../../../_services/listsServices';
import { userServices } from '../../../_services/userServices';
import If from '../../If';

export default function ShareList({ list }) {
    const [sharedUsers, setSharedUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [loadingCount, setLoadingCount] = useState(1);
    const [userSearchQuery, setUserSearchQuery] = useState('');
    const [suggestedUsers, setSuggestedUsers] = useState([]);

    useEffect(() => {
        if (!userSearchQuery) {
            setSuggestedUsers([]);
            return;
        };
        const controller = new AbortController();
        userServices.searchUsers(userSearchQuery, controller.signal)
            .then(res => {
                setSuggestedUsers(res.data);
            })
            .catch(err => {
                if (!isCancel(err)) setSuggestedUsers([]);
            });
        return () => controller.abort();
    }, [userSearchQuery]);

    useEffect(() => {
        if (!loadingUsers) return;
        const loadingInterval = setInterval(() => {
            setLoadingCount(count => (count % 3) + 1);
        }, 400);
        return () => clearInterval(loadingInterval);
    }, [loadingUsers]);

    const shareList = (email) => {
        if (!validators.isEmail(email)) return;
        listsServices.shareList(list, email)
            .then(res => {
                const newUser = res.data;
                if (newUser) setSharedUsers(users => [...users, newUser]);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const email = suggestedUsers[0]?.email || userSearchQuery;
        shareList(email);
    };

    const handleOpening = () => {
        setLoadingUsers(true);
        listsServices.getUsers(list)
            .then(res => {
                setSharedUsers(res.data);
            })
            .catch(err => {
            })
            .finally(() => {
                setLoadingUsers(false);
            });
    };

    const handleClosing = () => {
        setUserSearchQuery('');
        setSharedUsers([]);
        setLoadingCount(1);
    };

    const handleUserSearch = (e) => {
        e.preventDefault();
        setUserSearchQuery(e.target.value);
    };

    const trigger = (
        <div className='icon' title='Share'>
            <BsFillPersonPlusFill />
        </div>
    );

    const users = sharedUsers
        .map(({ firstName, lastName, email }) => {
            const handleUnshare = (e) => {
                e.preventDefault();
                listsServices.unshareList(list, email)
                    .then(res => {
                        setSharedUsers(users => users.filter(u => u.email !== email));
                    });
            };
            return (
                <div className='item' key={email}>
                    <div className='item__handle' title='Unshare' onClick={handleUnshare}>
                        <BsPersonDashFill />
                    </div>
                    <div className='item__caption'>
                        {`${firstName} ${lastName} (${email})`}
                    </div>
                </div>
            );
        });

    const suggestions = suggestedUsers
        .filter(suggestedUser => !sharedUsers.some(sharedUser => sharedUser.email === suggestedUser.email))
        .flatMap(({ firstName, lastName, email }) => [
            <div
                className={classNames({
                    'menu__item': true,
                    'menu__item--hoverable': true,
                    'menu__item--clickable': true,
                })}
                key={email}
                onClick={(e) => shareList(email)}
            >
                <div>
                    {`${firstName} ${lastName}`}
                </div>
                <div className='userCard__email'>
                    {email}
                </div>
            </div>,
            <div className='menu__divider' key={`${email}_div`} />
        ])
        .slice(0, -1);

    const body = (
        <div className='menu'>
            <div className='menu__item'>
                <form className='form form--wide' onSubmit={handleSubmit}>
                    <div className='form__field'>
                        <label>Shared with</label>
                        <If condition={loadingUsers}>
                            <div className='icon icon--disabled'>
                                <span>
                                    {Array(loadingCount).fill().map(i => <BsPersonFill />)}
                                </span>
                            </div>
                        </If>
                        <If condition={!loadingUsers}>
                            {users}
                        </If>
                    </div>
                    <div className='form__field'>
                        <label htmlFor='user'>Share with</label>
                        <input
                            className='form__input'
                            type='text'
                            name='user'
                            id='user'
                            onChange={handleUserSearch}
                            value={userSearchQuery}
                        />
                        <div className='floater'>
                            <If condition={suggestions.length > 0}>
                                <div className='floater__content'>
                                    <div className='menu'>
                                        {suggestions}
                                    </div>
                                </div>
                            </If>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );

    return (
        <Popup
            className='menu__popup'
            trigger={trigger}
            children={body}
            onOpen={handleOpening}
            onClose={handleClosing}
            position='bottom center'
            keepTooltipInside={true}
            arrow={false}
        />
    )
};