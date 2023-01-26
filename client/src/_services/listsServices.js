import { api } from '../api';

export const listsServices = {
    refreshAll: () => {
        return api.get('/lists/all');
    },

    createList: (list) => {
        return api.post('/lists/', list);
    }
};