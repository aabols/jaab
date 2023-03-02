import axios from 'axios';

import { store } from './store';
import { userActions } from './_actions/userActions';

const homepage = process.env.REACT_APP_HOMEPAGE;

const api = axios.create({
    baseURL: `${homepage}/api`,
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use((config) => {
    const token = store.getState().auth.user.token;
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});

api.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401) {
            store.dispatch(userActions.logout());
        }
        return Promise.reject(error);
    }
);

export {
    api
};