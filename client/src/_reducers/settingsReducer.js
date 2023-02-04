import { listsConstants } from '../_constants/listsConstants';
import { sortOptions } from '../utils/sortFunctions';

const initialState = {
    refreshRate: 5,
    sortOption: Object.keys(sortOptions)[0],
};

export const settingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case listsConstants.SET_REFRESH_RATE:
            return {
                ...state,
                refreshRate: action.payload
            };
        case listsConstants.SET_SORT_OPTION:
            return {
                ...state,
                sortOption: action.payload
            };
        default:
            return state;
    }
};