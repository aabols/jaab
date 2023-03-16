import { isCancel } from "axios";
import { v4 as uuid } from "uuid";
import { listsServices } from "../../_services/listsServices";

export const listActions = {
    readLists: (axiosConfig = {}) => dispatch => {
        return listsServices.readLists(axiosConfig)
            .then(({ data: lists }) => {
                dispatch({ type: '-lists-refresh', lists })
            })
            .catch(err => { })
    },

    createList: ({ id: listId = uuid(), ...listWithoutId }, axiosConfig = {}) => dispatch => {
        const path = '';
        const list = { id: listId, ...listWithoutId };
        const controller = new AbortController();
        dispatch({ type: '-lists-create-request', list, controller });
        return listsServices.createResource(path, list, { signal: controller.signal })
            .then(({ data: list }) => {
                dispatch({ type: '-list-create-success', listId, list });
            })
            .catch(err => {
                if (isCancel(err)) return;
                dispatch({ type: '-list-create-failure', listId });
            });
    },

    readList: (listId, axiosConfig = {}) => dispatch => {
        return listsServices.readList(listId, axiosConfig)
            .then(({ data: list }) => {
                dispatch({ type: '-list-refresh', listId, list })
            })
            .catch(err => { });
    },

    updateList: (listId, update, axiosConfig = {}) => dispatch => {
        const path = `${listId}`;
        const controller = new AbortController();
        dispatch({ type: '-list-update-request', listId, update, controller });
        return listsServices.updateResource(path, update, { signal: controller.signal })
            .then(({ data: update }) => {
                dispatch({ type: '-list-update-success', listId, update });
            })
            .catch(err => {
                if (isCancel(err)) return;
                dispatch({ type: '-list-update-failure', listId });
            });
    },

    deleteList: (listId, axiosConfig = {}) => dispatch => {
        const path = `${listId}`;
        const controller = new AbortController();
        dispatch({ type: '-list-delete-request', listId, controller });
        return listsServices.deleteResource(path, { signal: controller.signal })
            .then(res => {
                dispatch({ type: '-list-delete-success', listId });
            })
            .catch(err => {
                if (isCancel(err)) return;
                dispatch({ type: '-list-delete-failure', listId });
            });
    },
};
