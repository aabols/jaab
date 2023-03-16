import { isCancel } from "axios";
import { v4 as uuid } from "uuid";
import { listsServices } from "../../_services/listsServices";

export const groupActions = {
    createGroup: (listId, { id: groupId = uuid(), ...groupWithoutId }, axiosConfig = {}) => dispatch => {
        const path = `${listId}`;
        const group = { id: groupId, ...groupWithoutId };
        const controller = new AbortController();
        dispatch({ type: '-list--groups-create-request', listId, group, controller });
        return listsServices.createResource(path, group, { signal: controller.signal })
            .then(({ data: group }) => {
                dispatch({ type: '-list--group-create-success', listId, groupId, group });
            })
            .catch(err => {
                if (isCancel(err)) return;
                dispatch({ type: '-list--group-create-failure', listId, groupId });
            });
    },

    updateGroup: (listId, groupId, update, axiosConfig = {}) => dispatch => {
        const path = `${listId}/${groupId}`;
        const controller = new AbortController();
        dispatch({ type: '-list--group-update-request', listId, groupId, update, controller });
        return listsServices.updateResource(path, update, { signal: controller.signal })
            .then(({ data: update }) => {
                dispatch({ type: '-list--group-update-success', listId, groupId, update });
            })
            .catch(err => {
                if (isCancel(err)) return;
                dispatch({ type: '-list--group-update-failure', listId, groupId });
            });
    },

    deleteGroup: (listId, groupId, axiosConfig = {}) => dispatch => {
        const path = `${listId}/${groupId}`;
        const controller = new AbortController();
        dispatch({ type: '-list--group-delete-request', listId, groupId, controller });
        return listsServices.deleteResource(path, { signal: controller.signal })
            .then(res => {
                dispatch({ type: '-list--group-delete-success', listId, groupId });
            })
            .catch(err => {
                if (isCancel(err)) return;
                dispatch({ type: '-list--group-delete-failure', listId, groupId });
            });
    },
};
