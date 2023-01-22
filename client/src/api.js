import axios from 'axios';

import { store } from './store';

const api = axios.create({
    baseURL: '/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

api.interceptors.request.use((config) => {
    const token = store.getState().auth.user.token;
    config.headers.Authorization = token ? `Bearer ${token}` : '';
    return config;
});

export {
    api
};