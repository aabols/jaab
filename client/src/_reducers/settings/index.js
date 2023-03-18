import { settingsConstants } from '../../_constants/settingsConstants';
import { sortOptions } from '../../utils/sortFunctions';

const listRefreshDelay = localStorage.getItem(settingsConstants.LOCAL_STORAGE_KEY_REFRESH_DELAY) || settingsConstants.DEFAULT_REFRESH_DELAY;

const initialState = {
    listRefreshDelay,
    listsRefreshDelay: 5000,
    sortOption: Object.keys(sortOptions)[0],
    shoppingMode: false,
    globalSearch: '',
};

export const settingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case settingsConstants.SET_REFRESH_RATE:
            return {
                ...state,
                listRefreshDelay: Math.max(action.delay, settingsConstants.MIN_REFRESH_DELAY),
            };
        case settingsConstants.SET_GLOBAL_SEARCH:
            return {
                ...state,
                globalSearch: action.payload,
            };
        case settingsConstants.SET_SORT_OPTION:
            return {
                ...state,
                sortOption: action.payload,
            };
        case settingsConstants.SET_SHOPPING_MODE:
            return {
                ...state,
                shoppingMode: action.payload,
            };
        default:
            return state;
    }
};
