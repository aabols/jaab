import { combineReducers } from 'redux';

import { listReducer } from './listReducer';
import { groupReducer } from './groupReducer';
import { itemReducer } from './itemReducer';

export const listsReducer = combineReducers({
    lists: listReducer,
    groups: groupReducer,
    items: itemReducer,
});

//const initialState = {
//    lists: [],
//    groups: [],
//    items: [],
//    loading: false
//};

//import { listsConstants } from '../_constants/listsConstants';
//const listsReducerOld = (state = initialState, action) => {
//    switch (action.type) {
//        case listsConstants.CREATE_LIST_LOCAL:
//            return {
//                ...state,
//                lists: [
//                    ...state.lists,
//                    action.payload
//                ]
//            };
//        case listsConstants.CHANGE_LIST_LOCAL:
//            return {
//                ...state,
//                lists: [
//                    ...state.lists.filter(list => list.id !== action.payload.id),
//                    action.payload
//                ]
//            };
//        case listsConstants.DELETE_LIST_LOCAL:
//            return {
//                ...state,
//                lists: [ ...state.lists.filter(list => list.id !== action.payload) ]
//            };
        
//        case listsConstants.CREATE_GROUP_LOCAL:
//            return {
//                ...state,
//                groups: [
//                    ...state.groups,
//                    action.payload
//                ]
//            };
//        case listsConstants.CHANGE_GROUP_LOCAL:
//            return {
//                ...state,
//                groups: [
//                    ...state.groups.filter(group => group.id !== action.payload.id),
//                    action.payload
//                ]
//            };
//        case listsConstants.DELETE_GROUP_LOCAL:
//            return {
//                ...state,
//                groups: [ ...state.groups.filter(group => group.id !== action.payload) ]
//            };
        
//        case listsConstants.CREATE_ITEM_LOCAL:
//            return {
//                ...state,
//                items: [
//                    ...state.items,
//                    action.payload
//                ]
//            };
//        case listsConstants.CHANGE_ITEM_LOCAL:
//            return {
//                ...state,
//                items: [
//                    ...state.items.filter(item => item.id !== action.payload.id),
//                    action.payload
//                ]
//            };
//        case listsConstants.DELETE_ITEM_LOCAL:
//            return {
//                ...state,
//                items: [ ...state.items.filter(item => item.id !== action.payload) ]
//            };

//        case listsConstants.CREATE_LIST_REQUEST:
//            return {
//                ...state,
//                lists: [...state.lists, action.payload]
//            };
//        case listsConstants.CREATE_LIST_SUCCESS:
//            return {
//                ...state,
//                lists: [...state.lists.filter(list => list.id !== action.payload.id), action.payload]
//            };
//        case listsConstants.CREATE_LIST_FAILURE:
//            return {
//                ...state,
//                lists: state.lists.filter(list => list.id !== action.payload.id)
//            };

//        case listsConstants.REFRESH_ALL_REQUEST:
//            return {
//                ...state,
//                loading: true
//            };
//        case listsConstants.REFRESH_ALL_SUCCESS:
//            return {
//                ...state,
//                loading: false,
//                lists: action.payload
//            };
//        case listsConstants.REFRESH_ALL_FAILURE:
//            return {
//                ...state,
//                loading: false
//            };
//        default:
//            return state;
//    };
//};