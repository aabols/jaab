import { listsConstants } from '../_constants/listsConstants';
import { requestControllers } from '../requestControllers';
import { userConstants } from '../_constants/userConstants';

const initialState = [];

export const itemReducer = (state = initialState, action) => {
    switch (action.type) {
        case userConstants.LOGOUT_SUCCESS:
            return [];
        case listsConstants.CREATE_ITEM_LOCAL:
            state = state.slice();
            state.push(action.payload);
            return state;
        case listsConstants.CHANGE_ITEM_LOCAL:
            state = state.slice();
            state.splice(
                state.findIndex(item => item.id === action.payload.id),
                1,
                action.payload
            );
            return state;
        case listsConstants.DELETE_ITEM_LOCAL:
            state = state.slice();
            state.splice(
                state.findIndex(item => item.id === action.payload),
                1
            );
            return state;

        case listsConstants.REFRESH_ALL_SUCCESS:
            state = state.filter(c => (
                (!action.payload.items.find(s => s.id === c.id) && requestControllers.has(c.id)) || (requestControllers.get(c.id)?.type === listsConstants.UPDATE_ITEM_REQUEST)
            ));
            state.push(...action.payload.items.filter(s => (
                (!requestControllers.has(s.id) || requestControllers.get(s.id)?.type === listsConstants.CREATE_ITEM_REQUEST)
            )));
            return state;

        case listsConstants.CREATE_ITEM_REQUEST:
            state = state.slice();
            state.push(action.payload);
            return state;
        case listsConstants.CREATE_ITEM_SUCCESS:
            state = state.slice();
            state.splice(
                state.findIndex(item => item.id === action.payload.id),
                1,
                action.payload
            );
            return state;
        case listsConstants.CREATE_ITEM_FAILURE:
            state = state.slice();
            state.splice(
                state.findIndex(item => item.id === action.payload.id),
                1
            );
            return state;

        case listsConstants.UPDATE_ITEM_REQUEST:
            state = state.slice();
            state.splice(
                state.findIndex(item => item.id === action.payload.id),
                1,
                action.payload
            );
            return state;
        case listsConstants.UPDATE_ITEM_SUCCESS:
            state = state.slice();
            state.splice(
                state.findIndex(item => item.id === action.payload.id),
                1,
                action.payload
            );
            return state;
        case listsConstants.UPDATE_ITEM_FAILURE:
            state = state.slice();
            state.splice(
                state.findIndex(item => item.id === action.payload.id),
                1,
                action.payload
            );
            return state;

        case listsConstants.DELETE_ITEM_REQUEST:
            state = state.slice();
            state.splice(
                state.findIndex(item => item.id === action.payload.id),
                1
            );
            return state;
        case listsConstants.DELETE_ITEM_SUCCESS:
            return state;
        case listsConstants.DELETE_ITEM_FAILURE:
            state = state.slice();
            state.push(action.payload);
            return state;

        default:
            return state;
    };
};