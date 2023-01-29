import { v4 as uuid } from 'uuid';

import { listsConstants } from '../_constants/listsConstants';
import { listsServices } from '../_services/listsServices';

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

    createList: (list) => dispatch => {
        const listWithId = { id: uuid(), ...list };
        dispatch({
            type: listsConstants.CREATE_LIST_REQUEST,
            payload: listWithId
        });
        listsServices.createList(listWithId)
            .then(res => dispatch({
                    type: listsConstants.CREATE_LIST_SUCCESS,
                    payload: res.data
            }))
            .catch(res => dispatch({
                type: listsConstants.CREATE_LIST_FAILURE,
                payload: listWithId
            }));
    }
};