import { listsConstants } from '../_constants/listsConstants';

const initialState = [];

export const groupReducer = (state = initialState, action) => {
    switch (action.type) {
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
        default:
            return state;
    };
};