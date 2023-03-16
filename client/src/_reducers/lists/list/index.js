import { v4 as uuid } from 'uuid';
import groupsReducer from './groups';

const initialState = {
    id: null,
    title: null,
    groups: [],
    deleted: false,
    ongoingRequest: null,
};

export default function listReducer(state = initialState, action) {
    switch (action.type) {
        case 'refresh':
            return {
                ...state,
                ...(state.ongoingRequest ? {} : action.list),
                groups: action.list.ListGroups ? groupsReducer(
                    state.groups,
                    {
                        type: '-groups-refresh',
                        groups: action.list.ListGroups,
                    }
                ) : state.groups,
            };
        case 'create-request':
            return {
                ...state,
                id: uuid(),
                ...action.list,
                ongoingRequest: {
                    type: action.type,
                    controller: action.controller,
                },
            };
        case 'create-success':
            return {
                ...state,
                ...action.list,
                ongoingRequest: null,
            };
        case 'update-request':
            if (state.ongoingRequest) state.ongoingRequest.controller.abort();
            return {
                ...state,
                ...action.update,
                groups: state.groups,
                ongoingRequest: {
                    type: action.type,
                    controller: action.controller,
                },
                rollback: { ...state },
            };
        case 'update-success':
            return {
                ...state,
                ...action.update,
                items: state.items,
                ongoingRequest: null,
                rollback: null,
            };
        case 'update-failure':
            return {
                ...state.rollback,
                items: state.items,
                ongoingRequest: null,
                rollback: null,
            };
        case 'delete-request':
            return {
                ...state,
                deleted: true,
                ongoingRequest: {
                    type: action.type,
                    controller: action.controller,
                },
            };
        case 'delete-failure':
            return {
                ...state,
                deleted: false,
                ongoingRequest: null,
            };
        default:
            if (/-groups?-/.test(action.type)) return { ...state, groups: groupsReducer(state.groups, action) };
            return state;
    };
};
