import { isCancel } from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { BsFillPersonPlusFill, BsPersonDashFill } from 'react-icons/bs';
import { SiSpinrilla } from 'react-icons/si';
import Popup from 'reactjs-popup';
import classNames from 'classnames';
import { listsServices } from '../../../../../../_services/listsServices';
import { userServices } from '../../../../../../_services/userServices';
import If from '../../../../../_shared/if';
import { useSelector } from 'react-redux';
import Icon from '../../../../../_shared/icon';

export default function ShareList({ listId }) {
    const [sharedUsers, setSharedUsers] = useState([]);
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [userSearchQuery, setUserSearchQuery] = useState('');
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const user = useSelector(state => state.auth.user);
    const popupRef = useRef();

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

    const shareList = (username) => {
        listsServices.shareList(listId, username)
            .then(res => {
                const newUser = res.data;
                if (newUser) setSharedUsers(users => [...users, newUser]);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const username = suggestedUsers[0]?.username || userSearchQuery;
        shareList(username);
    };

    const handleOpening = () => {
        setLoadingUsers(true);
        listsServices.getUsers(listId)
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
    };

    const handleUserSearch = (e) => {
        e.preventDefault();
        setUserSearchQuery(e.target.value);
    };

    const handleMakePrivate = (e) => {
        e.preventDefault();
        sharedUsers.forEach(user => {
            listsServices.unshareList(listId, user.username)
                .then(res => {
                    setSharedUsers(users => users.filter(u => u.username !== user.username));
                });
        });
    };

    const handleUnsubscribe = (e) => {
        e.preventDefault();
        listsServices.unshareList(listId, user.username);
        popupRef.current.close();
    };

    const trigger = (<Icon title='Share' icon={<BsFillPersonPlusFill />} />);

    const users = sharedUsers
        .map(({ firstName, lastName, username }) => {
            const handleUnshare = (e) => {
                e.preventDefault();
                listsServices.unshareList(listId, username)
                    .then(res => {
                        setSharedUsers(users => users.filter(u => u.username !== username));
                    });
            };
            return (
                <div className='item' key={username}>
                    <div className='item__handle' title='Unshare' onClick={handleUnshare}>
                        <BsPersonDashFill />
                    </div>
                    <div className='item__caption'>
                        {`${firstName} ${lastName} (${username})`}
                    </div>
                </div>
            );
        });

    const suggestions = suggestedUsers
        .filter(suggestedUser => !sharedUsers.some(sharedUser => sharedUser.username === suggestedUser.username))
        .flatMap(({ firstName, lastName, username }) => [
            <div
                className={classNames({
                    'menu__item': true,
                    'menu__item--hoverable': true,
                    'menu__item--clickable': true,
                })}
                key={username}
                onClick={(e) => shareList(username)}
            >
                <div>
                    {`${firstName} ${lastName}`}
                </div>
                <div className='userCard__email'>
                    {username}
                </div>
            </div>,
            <div className='menu__divider' key={`${username}_div`} />
        ])
        .slice(0, -1);

    const body = (
        <div className='menu'>
            <div className='menu__item'>
                <form className='form form--wide' onSubmit={handleSubmit}>
                    <div className='form__field'>
                        <label>Shared with</label>
                        <If condition={loadingUsers}>
                            <div className='icon icon--spinning'>
                                <SiSpinrilla />
                            </div>
                        </If>
                        <If condition={!loadingUsers && users.length}>
                            {users}
                        </If>
                        <If condition={!loadingUsers && !users.length}>
                            <span style={{ fontStyle: 'italic' }}>Nobody</span>
                        </If>
                    </div>
                    <div className='form__field'>
                        <input
                            className='form__button'
                            type='button'
                            value='Make private'
                            disabled={!users.length}
                            onClick={handleMakePrivate}
                        />
                        <input
                            className='form__button'
                            type='button'
                            value='Unsubscribe'
                            disabled={!users.length}
                            onClick={handleUnsubscribe}
                        />
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
            ref={popupRef}
            onOpen={handleOpening}
            onClose={handleClosing}
            position='bottom center'
            keepTooltipInside={true}
            arrow={false}
        />
    )
};
