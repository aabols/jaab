import { api } from '../api';

export const listsServices = {
    refreshAll: (signal) => {
        return api.get('/lists/all', { signal });
    },

    getUsers: (list, signal) => {
        return api.get(`/lists/${list.id}/users`, { signal });
    },

    shareList: (list, username, signal) => {
        return api.put(`/lists/${list.id}/share`, { username }, { signal });
    },

    unshareList: (list, username, signal) => {
        return api.put(`/lists/${list.id}/unshare`, { username }, { signal });
    },

    readLists: (axiosConfig = {}) => {
        return api.get('/lists', axiosConfig);
    },

    createList: (list, signal) => {
        return api.post('/lists/', list, { signal });
    },

    readList: (list, axiosConfig = {}) => {
        return api.get(`/lists/${list.id}`, axiosConfig);
    },

    updateList: (list, signal) => {
        return api.put(`/lists/${list.id}`, list, { signal });
    },

    deleteList: (list, signal) => {
        return api.delete(`/lists/${list.id}`, { signal });
    },

    createGroup: (group, signal) => {
        return api.post(`/lists/${group.listId}`, group, { signal });
    },

    updateGroup: (group, signal) => {
        return api.put(`/lists/${group.listId}/${group.id}`, group, { signal });
    },

    deleteGroup: (group, signal) => {
        return api.delete(`/lists/${group.listId}/${group.id}`, { signal });
    },

    createItem: (item, signal) => {
        return api.post(`/lists/${item.listId}/${item.groupId}`, item, { signal });
    },

    updateItem: (item, signal) => {
        return api.put(`/lists/${item.listId}/${item.groupId}/${item.id}`, item, { signal });
    },

    deleteItem: (item, signal) => {
        return api.delete(`/lists/${item.listId}/${item.groupId}/${item.id}`, { signal });
    },
};