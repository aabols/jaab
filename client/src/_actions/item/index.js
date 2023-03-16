import { isCancel } from "axios";
import { v4 as uuid } from "uuid";
import { listsServices } from "../../_services/listsServices";

export const itemActions = {
    createItem: (listId, groupId, { id: itemId = uuid(), ...itemWithoutId }, axiosConfig = {}) => dispatch => {
        const path = `${listId}/${groupId}`;
        const item = { id: itemId, ...itemWithoutId };
        const controller = new AbortController();
        dispatch({ type: '-list--group--items-create-request', listId, groupId, item, controller });
        return listsServices.createResource(path, item, { signal: controller.signal })
            .then(({ data: item }) => {
                dispatch({ type: '-list--group--item-create-success', listId, groupId, itemId, item });
            })
            .catch(err => {
                if (isCancel(err)) return;
                dispatch({ type: '-list--group--item-create-failure', listId, groupId, itemId });
            });
    },

    updateItem: (listId, groupId, itemId, update, axiosConfig = {}) => dispatch => {
        const path = `${listId}/${groupId}/${itemId}`;
        const controller = new AbortController();
        dispatch({ type: '-list--group--item-update-request', listId, groupId, itemId, update, controller });
        return listsServices.updateResource(path, update, { signal: controller.signal })
            .then(({ data: update }) => {
                dispatch({ type: '-list--group--item-update-success', listId, groupId, itemId, update });
            })
            .catch(err => {
                if (isCancel(err)) return;
                dispatch({ type: '-list--group--item-update-failure', listId, groupId, itemId });
            });
    },

    deleteItem: (listId, groupId, itemId, axiosConfig = {}) => dispatch => {
        const path = `${listId}/${groupId}/${itemId}`;
        const controller = new AbortController();
        dispatch({ type: '-list--group--item-delete-request', listId, groupId, itemId, controller });
        return listsServices.deleteResource(path, { signal: controller.signal })
            .then(res => {
                dispatch({ type: '-list--group--item-delete-success', listId, groupId, itemId });
            })
            .catch(err => {
                if (isCancel(err)) return;
                dispatch({ type: '-list--group--item-delete-failure', listId, groupId, itemId });
            });
    },
};
