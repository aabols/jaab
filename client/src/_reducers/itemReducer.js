import { listsConstants } from '../_constants/listsConstants';
import { requestControllers } from '../requestControllers';
import { userConstants } from '../_constants/userConstants';

const initialState = [];

export const itemReducer = (state = initialState, action) => {
    switch (action.type) {
        case userConstants.LOGOUT_SUCCESS:
            return [];

        case listsConstants.READ_LIST_SUCCESS:
            {
                const items = action.payload.ListGroups
                    .flatMap(group => group.ListItems
                        .map(({ id, title, checked }) => ({ id, title, checked, groupId: group.id })));
                state = state.filter(localCopy => {
                    const serverCopy = items.find(serverCopy => serverCopy.id === localCopy.id);
                    const ongoingRequest = requestControllers.get(localCopy.id);
                    if (!serverCopy && ongoingRequest) return true;
                    if (ongoingRequest?.type === listsConstants.UPDATE_ITEM_REQUEST) return true;
                    return false;
                });
                state.push(...items.filter(serverCopy => {
                    const ongoingRequest = requestControllers.get(serverCopy.id);
                    if (!ongoingRequest) return true;
                    if (ongoingRequest.type === listsConstants.CREATE_ITEM_REQUEST) return true;
                    return false;
                }));
                return state;
            }

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