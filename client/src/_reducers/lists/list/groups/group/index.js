import { v4 as uuid } from 'uuid';
import itemsReducer from './items';

const initialState = {
    id: null,
    title: null,
    items: [],
    deleted: false,
    ongoingRequest: null,
    rollback: null,
};

export default function groupReducer(state = initialState, action) {
    switch (action.type) {
        case 'refresh':
            return {
                ...state,
                ...(state.ongoingRequest ? {} : action.group),
                items: itemsReducer(
                    state.items,
                    {
                        type: '-items-refresh',
                        items: action.group.ListItems,
                    }
                ),
            };
        case 'create-request':
            return {
                ...state,
                id: uuid(),
                ...action.group,
                ongoingRequest: {
                    type: action.type,
                    controller: action.controller,
                },
            };
        case 'create-success':
            return {
                ...state,
                ...action.group,
                ongoingRequest: null,
            };
        case 'update-request':
            if (state.ongoingRequest) state.ongoingRequest.controller.abort();
            return {
                ...state,
                ...action.update,
                items: state.items,
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
            if (/-items?-/.test(action.type)) return { ...state, items: itemsReducer(state.items, action) };
            return state;
    };
};
