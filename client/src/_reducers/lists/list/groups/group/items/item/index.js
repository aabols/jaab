import { v4 as uuid } from 'uuid';

const initialState = {
    id: null,
    title: null,
    checked: false,
    deleted: false,
    ongoingRequest: null,
    rollback: null,
};

export default function itemReducer(state = initialState, action) {
    switch (action.type) {
        case 'refresh':
            return {
                ...state,
                ...(state.ongoingRequest ? {} : action.item),
            };
        case 'create-request':
            return {
                ...state,
                id: uuid(),
                ...action.item,
                ongoingRequest: {
                    type: action.type,
                    controller: action.controller,
                },
            };
        case 'create-success':
            return {
                ...state,
                ...action.item,
                ongoingRequest: null,
            };
        case 'update-request':
            if (state.ongoingRequest) state.ongoingRequest.controller.abort();
            return {
                ...state,
                ...action.update,
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
                ongoingRequest: null,
                rollback: null,
            };
        case 'update-failure':
            return {
                ...state.rollback,
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
            return state;
    };
};
