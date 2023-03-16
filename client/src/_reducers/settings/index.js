import { settingsConstants } from '../../_constants/settingsConstants';
import { sortOptions } from '../../utils/sortFunctions';

const initialState = {
    listsRefreshDelay: 5000,
    listRefreshDelay: 2000,
    sortOption: Object.keys(sortOptions)[0],
    shoppingMode: false,
    globalSearch: '',
};

export const settingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case settingsConstants.SET_GLOBAL_SEARCH:
            return {
                ...state,
                globalSearch: action.payload
            };
        case settingsConstants.SET_SORT_OPTION:
            return {
                ...state,
                sortOption: action.payload
            };
        case settingsConstants.SET_SHOPPING_MODE:
            return {
                ...state,
                shoppingMode: action.payload
            };
        default:
            return state;
    }
};
