import { userConstants } from '../_constants/userConstants';
import { api } from '../api';

export const userServices = {
    register: (user) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        };
        return fetch('/testlists/register', requestOptions)
            .then(handleResponse);
    },

    login: (user) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        };
        return fetch('/testlists/login', requestOptions)
            .then(handleResponse)
            .then((data) => {
                localStorage.setItem(
                    userConstants.JWT_LOCAL_STORAGE_KEY,
                    JSON.stringify(data)
                );
                return data;
            });
    },

    logout: () => {
        localStorage.removeItem(userConstants.JWT_LOCAL_STORAGE_KEY);
    },

    deleteAccount: () => {
        return api.delete('/user');
    },

    searchUsers: (q, signal) => {
        return api.get('/user', { params: { q }, signal });
    },
};

const handleResponse = (response) => {
    return response.text().then((text) => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
};