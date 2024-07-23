import { isCancel } from 'axios';
import React from 'react';
import { userServices } from '../../../../../../../../_services/userServices';
import SearchInput from '../../../../../../../_shared/searchInput';

export default function UserInput({ excluded, onSelect }) {
    const finder = (query, setResults) => {
        const controller = new AbortController();
        userServices.searchUsers(query, controller.signal)
            .then(({ data: users }) => {
                setResults(users.filter(user => !excluded.find(listUser => listUser.username === user.username)));
            })
            .catch(err => {
                if (!isCancel(err)) setResults([]);
            });
        return () => controller.abort();
    };
    const display = ({ username, firstName, lastName }) => `${username} (${firstName} ${lastName})`;
    return (
        <SearchInput
            id='share-user'
            label={<span>Add new user:</span>}
            finder={finder}
            display={display}
            onSelect={onSelect}
        />
    );
};
