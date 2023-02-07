import { listsConstants } from '../_constants/listsConstants';
import { requestControllers } from '../requestControllers';
import { userConstants } from '../_constants/userConstants';

const initialState = [];

export const listReducer = (state = initialState, action) => {
    switch (action.type) {
        case userConstants.LOGOUT_SUCCESS:
            return [];
        case listsConstants.CREATE_LIST_LOCAL:
            state = state.slice();
            state.push(action.payload);
            return state;
        case listsConstants.CHANGE_LIST_LOCAL:
            state = state.slice();
            state.splice(
                state.findIndex(list => list.id === action.payload.id),
                1,
                action.payload
            );
            return state;
        case listsConstants.DELETE_LIST_LOCAL:
            state = state.slice();
            state.splice(
                state.findIndex(list => list.id === action.payload),
                1
            );
            return state;

        case listsConstants.REFRESH_ALL_SUCCESS:
            state = state.filter(c => (
                (!action.payload.lists.find(s => s.id === c.id) && requestControllers.has(c.id)) || (requestControllers.get(c.id)?.type === listsConstants.UPDATE_LIST_REQUEST)
            ));
            state.push(...action.payload.lists.filter(s => (
                (!requestControllers.has(s.id) || requestControllers.get(s.id)?.type === listsConstants.CREATE_LIST_REQUEST)
            )));
            return state;
            /*
                | item in SERVER | item in CLIENT | controller || RESULT ||
                +----------------+----------------+------------++--------++----------++
                |       no       |       no       |     no     || ignore ||          ||          ||
                |       no       |       no       |     yes    || ignore ||          ||          ||
                |       yes      |       no       |     C      || ignore ||          ||          ||
                |       yes      |       no       |     U      || ignore ||          ||          ||
                |       yes      |       yes      |     D      || ignore ||          ||          ||
                |       no       |       yes      |     D      || ignore ||          ||          ||
                |       no       |       yes      |     C      || keep C ||          ||          || keep C ||
                |       no       |       yes      |     U      || keep C ||          ||          || keep C ||
                |       no       |       yes      |     no     || remove || remove C ||          ||
                |       yes      |       yes      |     U      || keep C ||          || remove S || keep C ||
                |       yes      |       yes      |     no     || keep S || remove C ||          ||
                |       yes      |       yes      |     C      || keep S || remove C ||          ||
                |       yes      |       no       |     no     || keep S ||          ||          ||
                |       yes      |       no       |     D      || remove ||          || remove S ||
            */

        case listsConstants.CREATE_LIST_REQUEST:
            state = state.slice();
            state.push(action.payload);
            return state;
        case listsConstants.CREATE_LIST_SUCCESS:
            state = state.slice();
            state.splice(
                state.findIndex(list => list.id === action.payload.id),
                1,
                action.payload
            );
            return state;
        case listsConstants.CREATE_LIST_FAILURE:
            state = state.slice();
            state.splice(
                state.findIndex(list => list.id === action.payload.id),
                1
            );
            return state;

        case listsConstants.UPDATE_LIST_REQUEST:
            state = state.slice();
            state.splice(
                state.findIndex(list => list.id === action.payload.id),
                1,
                action.payload
            );
            return state;
        case listsConstants.UPDATE_LIST_SUCCESS:
            state = state.slice();
            state.splice(
                state.findIndex(list => list.id === action.payload.id),
                1,
                action.payload
            );
            return state;
        case listsConstants.UPDATE_LIST_FAILURE:
            state = state.slice();
            state.splice(
                state.findIndex(list => list.id === action.payload.id),
                1,
                action.payload
            );
            return state;

        case listsConstants.DELETE_LIST_REQUEST:
            state = state.slice();
            state.splice(
                state.findIndex(list => list.id === action.payload.id),
                1
            );
            return state;
        case listsConstants.DELETE_LIST_SUCCESS:
            return state;
        case listsConstants.DELETE_LIST_FAILURE:
            state = state.slice();
            state.push(action.payload);
            return state;
        default:
            return state;
    };
};