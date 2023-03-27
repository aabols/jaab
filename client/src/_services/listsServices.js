import { api } from '../api';

export const listsServices = {
    getUsers: (listId, axiosConfig = {}) => {
        return api.get(`/lists/${listId}/users`, axiosConfig);
    },

    shareList: (listId, username, role, axiosConfig = {}) => {
        return api.put(`/lists/${listId}/share`, { username, role }, axiosConfig);
    },

    unshareList: (listId, username, signal) => {
        return api.put(`/lists/${listId}/unshare`, { username }, { signal });
    },

    readLists: (axiosConfig = {}) => {
        return api.get('/lists', axiosConfig);
    },

    readList: (listId, axiosConfig = {}) => {
        return api.get(`/lists/${listId}`, axiosConfig);
    },

    createResource: (path, resource, axiosConfig = {}) => {
        return api.post(`/lists/${path}`, resource, axiosConfig);
    },

    updateResource: (path, update, axiosConfig = {}) => {
        return api.put(`/lists/${path}`, update, axiosConfig);
    },

    deleteResource: (path, axiosConfig = {}) => {
        return api.delete(`/lists/${path}`, axiosConfig);
    },
};