import { listsConstants } from '../_constants/listsConstants';
import { requestControllers } from '../requestControllers';
import { userConstants } from '../_constants/userConstants';

const initialState = [];

export const groupReducer = (state = initialState, action) => {
    switch (action.type) {
        case userConstants.LOGOUT_SUCCESS:
            return [];
        case listsConstants.CREATE_GROUP_LOCAL:
            state = state.slice();
            state.push(action.payload);
            return state;
        case listsConstants.CHANGE_GROUP_LOCAL:
            state = state.slice();
            state.splice(
                state.findIndex(group => group.id === action.payload.id),
                1,
                action.payload
            );
            return state;
        case listsConstants.DELETE_GROUP_LOCAL:
            state = state.slice();
            state.splice(
                state.findIndex(group => group.id === action.payload),
                1
            );
            return state;

        case listsConstants.REFRESH_ALL_SUCCESS:
            state = state.filter(c => (
                (!action.payload.groups.find(s => s.id === c.id) && requestControllers.has(c.id)) || (requestControllers.get(c.id)?.type === listsConstants.UPDATE_GROUP_REQUEST)
            ));
            state.push(...action.payload.groups.filter(s => (
                (!requestControllers.has(s.id) || requestControllers.get(s.id)?.type === listsConstants.CREATE_GROUP_REQUEST)
            )));
            return state;

        case listsConstants.CREATE_GROUP_REQUEST:
            state = state.slice();
            state.push(action.payload);
            return state;
        case listsConstants.CREATE_GROUP_SUCCESS:
            state = state.slice();
            state.splice(
                state.findIndex(group => group.id === action.payload.id),
                1,
                action.payload
            );
            return state;
        case listsConstants.CREATE_GROUP_FAILURE:
            state = state.slice();
            state.splice(
                state.findIndex(group => group.id === action.payload.id),
                1
            );
            return state;

        case listsConstants.UPDATE_GROUP_REQUEST:
            state = state.slice();
            state.splice(
                state.findIndex(group => group.id === action.payload.id),
                1,
                action.payload
            );
            return state;
        case listsConstants.UPDATE_GROUP_SUCCESS:
            state = state.slice();
            state.splice(
                state.findIndex(group => group.id === action.payload.id),
                1,
                action.payload
            );
            return state;
        case listsConstants.UPDATE_GROUP_FAILURE:
            state = state.slice();
            state.splice(
                state.findIndex(group => group.id === action.payload.id),
                1,
                action.payload
            );
            return state;

        case listsConstants.DELETE_GROUP_REQUEST:
            state = state.slice();
            state.splice(
                state.findIndex(group => group.id === action.payload.id),
                1
            );
            return state;
        case listsConstants.DELETE_GROUP_SUCCESS:
            return state;
        case listsConstants.DELETE_GROUP_FAILURE:
            state = state.slice();
            state.push(action.payload);
            return state;

        default:
            return state;
    };
};