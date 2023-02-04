import { v4 as uuid } from 'uuid';

import { listsConstants } from '../_constants/listsConstants';
import { listsServices } from '../_services/listsServices';
import { requestControllers } from '../requestControllers';
import { isCancel } from 'axios';

let stopReload;

export const listsActions = {
    refreshAll: () => dispatch => {
        dispatch({ type: listsConstants.REFRESH_ALL_REQUEST });
        listsServices.refreshAll()
            .then(res => dispatch({
                    type: listsConstants.REFRESH_ALL_SUCCESS,
                    payload: res.data
            }))
            .catch(res => dispatch({
                    type: listsConstants.REFRESH_ALL_FAILURE
            }));
    },

    createListLocal: (list) => dispatch => {
        const listWithId = { id: uuid(), ...list };
        dispatch({
            type: listsConstants.CREATE_LIST_LOCAL,
            payload: listWithId
        });
    },

    changeListLocal: (list) => dispatch => {
        dispatch({
            type: listsConstants.CHANGE_LIST_LOCAL,
            payload: list
        });
    },

    deleteListLocal: (listId) => dispatch => {
        dispatch({
            type: listsConstants.DELETE_LIST_LOCAL,
            payload: listId
        });
    },

    createGroupLocal: (group) => dispatch => {
        const groupWithId = { id: uuid(), ...group };
        dispatch({
            type: listsConstants.CREATE_GROUP_LOCAL,
            payload: groupWithId
        });
    },

    changeGroupLocal: (group) => dispatch => {
        dispatch({
            type: listsConstants.CHANGE_GROUP_LOCAL,
            payload: group
        });
    },

    deleteGroupLocal: (groupId) => dispatch => {
        dispatch({
            type: listsConstants.DELETE_GROUP_LOCAL,
            payload: groupId
        });
    },

    createItemLocal: (item) => dispatch => {
        const itemWithId = { id: uuid(), ...item };
        dispatch({
            type: listsConstants.CREATE_ITEM_LOCAL,
            payload: itemWithId
        });
    },

    changeItemLocal: (item) => dispatch => {
        dispatch({
            type: listsConstants.CHANGE_ITEM_LOCAL,
            payload: item
        });
    },

    deleteItemLocal: (itemId) => dispatch => {
        dispatch({
            type: listsConstants.DELETE_ITEM_LOCAL,
            payload: itemId
        });
    },

    reloadLists: (interval) => dispatch => {
        let timeoutId;
        let refreshController;
        const refreshFunction = () => {
            refreshController = new AbortController();
            listsServices.refreshAll(refreshController.signal)
                .then(res => {
                    refreshController = null;
                    dispatch({
                        type: listsConstants.REFRESH_ALL_SUCCESS,
                        payload: {
                            lists: res.data
                                .map(({ id, title }) => ({ id, title })),
                            groups: res.data
                                .flatMap(({ id: listId, ListGroups }) => ListGroups
                                    .map(({ id, title }) => ({ listId, id, title }))),
                            items: res.data
                                .flatMap(({ id: listId, ListGroups }) => ListGroups
                                    .flatMap(({ id: groupId, ListItems }) => ListItems
                                        .map(({ id, title, checked }) => ({ listId, groupId, id, title, checked })))),
                        }
                    });
                    timeoutId = setTimeout(refreshFunction, interval);
                })
                .catch(err => {
                    if (!isCancel(err)) {
                        refreshController = null;
                        timeoutId = setTimeout(refreshFunction, interval);
                    }
                });
        };
        stopReload = () => {
            if (timeoutId) { clearTimeout(timeoutId) };
            if (refreshController) { refreshController.abort() };
        };
        refreshFunction();
    },

    stopReloadLists: () => dispatch => {
        stopReload();
    },

    createList: (list) => dispatch => {
        const listWithId = { id: uuid(), ...list };
        dispatch({
            type: listsConstants.CREATE_LIST_REQUEST,
            payload: listWithId
        });
        const controller = new AbortController();
        requestControllers.set(listWithId.id, {
            controller,
            type: listsConstants.CREATE_LIST_REQUEST
        });
        listsServices.createList(listWithId, controller.signal)
            .then(res => {
                const { callback } = requestControllers.get(listWithId.id) || {};
                requestControllers.delete(listWithId.id);
                if (callback) {
                    callback();
                } else {
                    dispatch({
                        type: listsConstants.CREATE_LIST_SUCCESS,
                        payload: res.data
                    });
                }
            })
            .catch(err => {
                requestControllers.delete(listWithId.id);
                dispatch({
                    type: listsConstants.CREATE_LIST_FAILURE,
                    payload: listWithId
                });
            });
    },

    updateList: (list, rollback) => dispatch => {
        const updateFunction = () => {
            const controller = new AbortController();
            requestControllers.set(list.id, {
                controller,
                type: listsConstants.UPDATE_LIST_REQUEST
            });
            listsServices.updateList(list, controller.signal)
                .then(res => {
                    requestControllers.delete(list.id);
                    dispatch({
                        type: listsConstants.UPDATE_LIST_SUCCESS,
                        payload: res.data
                    });
                })
                .catch(err => {
                    if (!isCancel(err)) {
                        requestControllers.delete(list.id);
                        dispatch({
                            type: listsConstants.UPDATE_LIST_FAILURE,
                            payload: rollback
                        });
                    }
                });
        };
        dispatch({
            type: listsConstants.UPDATE_LIST_REQUEST,
            payload: list
        });
        const { controller, type } = requestControllers.get(list.id) || {};
        if (type === listsConstants.CREATE_LIST_REQUEST) {
            requestControllers.set(list.id, {
                ...requestControllers.get(list.id),
                callback: updateFunction
            });
            return;
        }
        if (controller) {
            controller.abort();
            requestControllers.delete(list.id);
        }
        updateFunction();
    },

    deleteList: (list) => dispatch => {
        const deleteFunction = () => {
            const controller = new AbortController();
            requestControllers.set(list.id, {
                controller,
                type: listsConstants.DELETE_LIST_REQUEST
            });
            listsServices.deleteList(list, controller.signal)
                .then(res => {
                    requestControllers.delete(list.id);
                    dispatch({
                        type: listsConstants.DELETE_LIST_SUCCESS,
                        payload: list
                    });
                })
                .catch(err => {
                    if (!isCancel(err)) {
                        requestControllers.delete(list.id);
                        dispatch({
                            type: listsConstants.DELETE_LIST_FAILURE,
                            payload: list
                        });
                    }
                });
        };
        dispatch({
            type: listsConstants.DELETE_LIST_REQUEST,
            payload: list
        });
        const { controller, type } = requestControllers.get(list.id) || {};
        if (type === listsConstants.CREATE_LIST_REQUEST) {
            requestControllers.set(list.id, {
                ...requestControllers.get(list.id),
                callback: deleteFunction
            });
            return;
        }
        if (controller) {
            controller.abort();
            requestControllers.delete(list.id);
        }
        deleteFunction();
    },

    createGroup: (group) => dispatch => {
        const groupWithId = { id: uuid(), ...group };
        dispatch({
            type: listsConstants.CREATE_GROUP_REQUEST,
            payload: groupWithId
        });
        const controller = new AbortController();
        requestControllers.set(groupWithId.id, {
            controller,
            type: listsConstants.CREATE_GROUP_REQUEST
        });
        listsServices.createGroup(groupWithId, controller.signal)
            .then(res => {
                const { callback } = requestControllers.get(groupWithId.id) || {};
                requestControllers.delete(groupWithId.id);
                if (callback) {
                    callback();
                } else {
                    dispatch({
                        type: listsConstants.CREATE_GROUP_SUCCESS,
                        payload: { listId: group.listId, ...res.data }
                    });
                }
            })
            .catch(err => {
                requestControllers.delete(groupWithId.id);
                dispatch({
                    type: listsConstants.CREATE_GROUP_FAILURE,
                    payload: groupWithId
                });
            });
    },

    updateGroup: (group, rollback) => dispatch => {
        const updateFunction = () => {
            const controller = new AbortController();
            requestControllers.set(group.id, {
                controller,
                type: listsConstants.UPDATE_GROUP_REQUEST
            });
            listsServices.updateGroup(group, controller.signal)
                .then(res => {
                    requestControllers.delete(group.id);
                    dispatch({
                        type: listsConstants.UPDATE_GROUP_SUCCESS,
                        payload: { listId: group.listId, ...res.data }
                    });
                })
                .catch(err => {
                    if (!isCancel(err)) {
                        requestControllers.delete(group.id);
                        dispatch({
                            type: listsConstants.UPDATE_GROUP_FAILURE,
                            payload: rollback
                        });
                    }
                });
        };
        dispatch({
            type: listsConstants.UPDATE_GROUP_REQUEST,
            payload: group
        });
        const { controller, type } = requestControllers.get(group.id) || {};
        if (type === listsConstants.CREATE_GROUP_REQUEST) {
            requestControllers.set(group.id, {
                ...requestControllers.get(group.id),
                callback: updateFunction
            });
            return;
        }
        if (controller) {
            controller.abort();
            requestControllers.delete(group.id);
        }
        updateFunction();
    },

    deleteGroup: (group) => dispatch => {
        const deleteFunction = () => {
            const controller = new AbortController();
            requestControllers.set(group.id, {
                controller,
                type: listsConstants.DELETE_GROUP_REQUEST
            });
            listsServices.deleteGroup(group, controller.signal)
                .then(res => {
                    requestControllers.delete(group.id);
                    dispatch({
                        type: listsConstants.DELETE_GROUP_SUCCESS,
                        payload: group
                    });
                })
                .catch(err => {
                    if (!isCancel(err)) {
                        requestControllers.delete(group.id);
                        dispatch({
                            type: listsConstants.DELETE_GROUP_FAILURE,
                            payload: group
                        });
                    }
                });
        };
        dispatch({
            type: listsConstants.DELETE_GROUP_REQUEST,
            payload: group
        });
        const { controller, type } = requestControllers.get(group.id) || {};
        if (type === listsConstants.CREATE_GROUP_REQUEST) {
            requestControllers.set(group.id, {
                ...requestControllers.get(group.id),
                callback: deleteFunction
            });
            return;
        }
        if (controller) {
            controller.abort();
            requestControllers.delete(group.id);
        }
        deleteFunction();
    },

    createItem: (item) => dispatch => {
        const itemWithId = { id: uuid(), ...item };
        dispatch({
            type: listsConstants.CREATE_ITEM_REQUEST,
            payload: itemWithId
        });
        const controller = new AbortController();
        requestControllers.set(itemWithId.id, {
            controller,
            type: listsConstants.CREATE_ITEM_REQUEST
        });
        listsServices.createItem(itemWithId, controller.signal)
            .then(res => {
                const { callback } = requestControllers.get(itemWithId.id) || {};
                requestControllers.delete(itemWithId.id);
                if (callback) {
                    callback();
                } else {
                    dispatch({
                        type: listsConstants.CREATE_ITEM_SUCCESS,
                        payload: { listId: item.listId, groupId: item.groupId, ...res.data }
                    });
                }
            })
            .catch(err => {
                requestControllers.delete(itemWithId.id);
                dispatch({
                    type: listsConstants.CREATE_ITEM_FAILURE,
                    payload: itemWithId
                });
            });
    },

    updateItem: (item, rollback) => dispatch => {
        const updateFunction = () => {
            const controller = new AbortController();
            requestControllers.set(item.id, {
                controller,
                type: listsConstants.UPDATE_ITEM_REQUEST
            });
            listsServices.updateItem(item, controller.signal)
                .then(res => {
                    requestControllers.delete(item.id);
                    dispatch({
                        type: listsConstants.UPDATE_ITEM_SUCCESS,
                        payload: { listId: item.listId, groupId: item.groupId, ...res.data }
                    });
                })
                .catch(err => {
                    if (!isCancel(err)) {
                        requestControllers.delete(item.id);
                        dispatch({
                            type: listsConstants.UPDATE_ITEM_FAILURE,
                            payload: rollback
                        });
                    }
                });
        };
        dispatch({
            type: listsConstants.UPDATE_ITEM_REQUEST,
            payload: item
        });
        const { controller, type } = requestControllers.get(item.id) || {};
        if (type === listsConstants.CREATE_ITEM_REQUEST) {
            requestControllers.set(item.id, {
                ...requestControllers.get(item.id),
                callback: updateFunction
            });
            return;
        }
        if (controller) {
            controller.abort();
            requestControllers.delete(item.id);
        }
        updateFunction();
    },

    deleteItem: (item) => dispatch => {
        const deleteFunction = () => {
            const controller = new AbortController();
            requestControllers.set(item.id, {
                controller,
                type: listsConstants.DELETE_ITEM_REQUEST
            });
            listsServices.deleteItem(item, controller.signal)
                .then(res => {
                    requestControllers.delete(item.id);
                    dispatch({
                        type: listsConstants.DELETE_ITEM_SUCCESS,
                        payload: item
                    });
                })
                .catch(err => {
                    if (!isCancel(err)) {
                        requestControllers.delete(item.id);
                        dispatch({
                            type: listsConstants.DELETE_ITEM_FAILURE,
                            payload: item
                        });
                    }
                });
        };
        dispatch({
            type: listsConstants.DELETE_ITEM_REQUEST,
            payload: item
        });
        const { controller, type } = requestControllers.get(item.id) || {};
        if (type === listsConstants.CREATE_ITEM_REQUEST) {
            requestControllers.set(item.id, {
                ...requestControllers.get(item.id),
                callback: deleteFunction
            });
            return;
        }
        if (controller) {
            controller.abort();
            requestControllers.delete(item.id);
        }
        deleteFunction();
    },
};