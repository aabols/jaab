import { listsConstants } from '../_constants/listsConstants';
import { sortOptions } from '../utils/sortFunctions';

const initialState = {
    listsRefreshDelay: 5000,
    listRefreshDelay: 2000,
    sortOption: Object.keys(sortOptions)[0],
    shoppingMode: false,
    globalSearch: '',
};

export const settingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case listsConstants.SET_GLOBAL_SEARCH:
            return {
                ...state,
                globalSearch: action.payload
            };
        case listsConstants.SET_SORT_OPTION:
            return {
                ...state,
                sortOption: action.payload
            };
        case listsConstants.SET_SHOPPING_MODE:
            return {
                ...state,
                shoppingMode: action.payload
            };
        default:
            return state;
    }
};