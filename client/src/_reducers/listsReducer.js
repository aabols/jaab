import { listsConstants } from '../_constants/listsConstants';

const initialState = {
    lists: [],
    loading: false
};

export const listsReducer = (state = initialState, action) => {
    switch (action.type) {
        case listsConstants.CREATE_LIST_REQUEST:
            return {
                ...state,
                lists: [...state.lists, action.payload]
            };
        case listsConstants.CREATE_LIST_SUCCESS:
            return {
                ...state,
                lists: [...state.lists.filter(list => list.id !== action.payload.temporaryId), action.payload.list]
            };
        case listsConstants.CREATE_LIST_FAILURE:
            return {
                ...state,
                lists: state.lists.filter(list => list.id !== action.payload)
            };

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