import React, { useEffect, useState } from 'react';
import { listsServices } from '../../_services/listsServices';
import { userServices } from '../../_services/userServices';

import './ListSharing.css';

export default function ListSharing({ list }) {
    const [sharedWith, setSharedWith] = useState([]);
    const [loading, setLoading] = useState(false);
    const [shareInput, setShareInput] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [usersFound, setUsersFound] = useState([]);

    useEffect(() => {
        setLoading(true);
        const controller = new AbortController();
        listsServices.getUsers(list, controller.signal)
            .then(res => {
                setSharedWith(res.data);
                setLoading(false);
            })
            .catch(err => setLoading(false));
        return () => controller.abort();
    }, []);

    useEffect(() => {
        if (!shareInput) {
            setUsersFound([]);
            return;
        }
        const controller = new AbortController();
        userServices.searchUsers(shareInput, controller.signal)
            .then(res => setUsersFound(res.data));
        return () => controller.abort();
    }, [shareInput]);

    const loadingPlaceholder = <div>Loading...</div>;
    
    const handleShareInputChange = (e) => {
        e.preventDefault();
        setShareInput(e.target.value);
    };
    
    const handleShare = (e, email) => {
        e.preventDefault();
        setErrorMessage('');
        listsServices.shareList(list, email || shareInput)
            .then(res => {
                listsServices.getUsers(list)
                    .then(res => setSharedWith(res.data));
            })
            .catch(err => {
                setErrorMessage(err.response.data.message);
            });
        setShareInput('');
    };

    const handleUnshare = (e, email) => {
        e.preventDefault();
        listsServices.unshareList(list, email)
            .then(() => {
                listsServices.getUsers(list)
                    .then(res => setSharedWith(res.data));
            });
    };

    const userSuggestions = usersFound
        .map(({ email, firstName, lastName }) => (
            <div key={email} onClick={(e) => handleShare(e, email)}>
                {`${firstName} ${lastName} (${email})`}
            </div>
        ));
    
    const users = sharedWith
        .map(({ firstName, lastName, email }) => <div className='user' key={email}>
            <span className='remove' onClick={e => handleUnshare(e, email)}> &times; </span>
            <span> {firstName} {lastName} ({email}) </span>
        </div>);
    
    return (
        <div id='ListSharing'>
            <h2>{list.title}</h2>
            <form onSubmit={handleShare}>
                <input type='text' placeholder='Share with (email)...' onChange={handleShareInputChange} value={shareInput}/>
            </form>
            {
                userSuggestions.length > 0 ? (
                    <div className='suggestionWrapper'>
                        <div className='suggestions'>
                            { userSuggestions }
                        </div>
                    </div>
                ) : null
            }
            <div className='error'>{ errorMessage }</div>
            <h3>Shared with:</h3>
            { loading ? loadingPlaceholder : users }
        </div>
    )
};