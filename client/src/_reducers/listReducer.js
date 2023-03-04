import { listsConstants } from '../_constants/listsConstants';
import { requestControllers } from '../requestControllers';
import { userConstants } from '../_constants/userConstants';

const initialState = [];

export const listReducer = (state = initialState, action) => {
    switch (action.type) {
        case userConstants.LOGOUT_SUCCESS:
            return [];

        case listsConstants.READ_LISTS_SUCCESS:
            state = state.filter(localCopy => {
                const serverCopy = action.payload.find(serverList => serverList.id === localCopy.id);
                const ongoingRequest = requestControllers.get(localCopy.id);
                if (!serverCopy && ongoingRequest) return true;
                if (ongoingRequest?.type === listsConstants.UPDATE_LIST_REQUEST) return true;
                return false;
            });
            state.push(...action.payload.filter(serverCopy => {
                const ongoingRequest = requestControllers.get(serverCopy.id);
                if (!ongoingRequest) return true;
                if (ongoingRequest.type === listsConstants.CREATE_LIST_REQUEST) return true;
                return false;
            }));
            return state;

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