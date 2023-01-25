import { api } from '../api';

export const listsServices = {
    refreshAll: () => {
        return api.get('/lists/all');
    }
};