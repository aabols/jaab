import itemReducer from './item';

const initialState = [];

export default function itemsReducer(state = initialState, action) {
    const fwdAction = { ...action, type: action.type.replace(/-items?-/, '') };
    switch (action.type) {
        case '-items-create-request':
            return [...state, itemReducer(undefined, fwdAction)];
        case '-item-create-failure':
            return state.filter(item => item.id !== action.itemId);
        case '-item-delete-success':
            return state.filter(item => item.id !== action.itemId);
        case '-items-refresh':
            return [
                ...state.map(localCopy => {
                    const serverCopy = action.items.find(serverCopy => serverCopy.id === localCopy.id);
                    const ongoingRequest = localCopy.ongoingRequest;
                    if (!serverCopy && !ongoingRequest) return null;
                    return itemReducer(
                        localCopy,
                        {
                            type: 'refresh',
                            item: serverCopy,
                        }
                    );
                }),
                ...action.items.map(serverCopy => {
                    const localCopy = state.find(localCopy => localCopy.id === serverCopy.id);
                    if (localCopy) return null;
                    return itemReducer(
                        undefined,
                        {
                            type: 'refresh',
                            item: serverCopy,
                        }
                    );
                }),
            ].filter(item => !!item);
        default:
            if (/-item-/.test(action.type)) return state.map(item => item.id === action.itemId ? itemReducer(item, fwdAction) : item);
            if (/-items-/.test(action.type)) return state.map(item => itemReducer(item, fwdAction));
            return state;
    };
};
