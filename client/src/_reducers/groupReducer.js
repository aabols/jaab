import { listsConstants } from '../_constants/listsConstants';
import { requestControllers } from '../requestControllers';
import { userConstants } from '../_constants/userConstants';

const initialState = [];

export const groupReducer = (state = initialState, action) => {
    switch (action.type) {
        case userConstants.LOGOUT_SUCCESS:
            return [];

        case listsConstants.READ_LIST_SUCCESS:
            state = state.filter(localCopy => {
                const serverCopy = action.payload.ListGroups.find(serverCopy => serverCopy.id === localCopy.id);
                const ongoingRequest = requestControllers.get(localCopy.id);
                if (!serverCopy && ongoingRequest) return true;
                if (ongoingRequest?.type === listsConstants.UPDATE_GROUP_REQUEST) return true;
                return false;
            });
            state.push(...action.payload.ListGroups.filter(serverCopy => {
                const ongoingRequest = requestControllers.get(serverCopy.id);
                if (!ongoingRequest) return true;
                if (ongoingRequest.type === listsConstants.CREATE_GROUP_REQUEST) return true;
                return false;
            }).map(({ id, title }) => ({ id, title, listId: action.payload.id })));
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
