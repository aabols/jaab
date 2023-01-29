import { listsConstants } from '../_constants/listsConstants';

const initialState = [];

export const listReducer = (state = initialState, action) => {
    switch (action.type) {
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
        default:
            return state;
    };
};