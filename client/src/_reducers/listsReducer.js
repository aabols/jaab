import { listsConstants } from '../_constants/listsConstants';

const initialState = {
    lists: [],
    loading: false
};

const listsReducer = (state = initialState, action) => {
    switch (action.type) {
        case listsConstants.REFRESH_ALL_REQUEST:
            return {
                ...state,
                loading: true
            };
        case listsConstants.REFRESH_ALL_SUCCESS:
            return {
                ...state,
                loading: false,
                lists: action.payload
            };
        case listsConstants.REFRESH_ALL_FAILURE:
            return {
                ...state,
                loading: false
            };
        default:
            return state;
    };
};

export { listsReducer };