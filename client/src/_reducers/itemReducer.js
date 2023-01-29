import { listsConstants } from '../_constants/listsConstants';

const initialState = [];

export const itemReducer = (state = initialState, action) => {
    switch (action.type) {
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
        default:
            return state;
    };
};