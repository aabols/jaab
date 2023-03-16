import listReducer from './list';

const initialState = [];

export default function listsReducer(state = initialState, action) {
    const fwdAction = { ...action, type: action.type.replace(/-lists?-/, '') };
    switch (action.type) {
        case '-lists-create-request':
            return [...state, listReducer(undefined, fwdAction)];
        case '-list-create-failure':
            return state.filter(list => list.id !== action.listId);
        case '-list-delete-success':
            return state.filter(list => list.id !== action.listId);
        case '-lists-refresh':
            return [
                ...state.map(localCopy => {
                    const serverCopy = action.lists.find(serverCopy => serverCopy.id === localCopy.id);
                    const ongoingRequest = localCopy.ongoingRequest;
                    if (!serverCopy && !ongoingRequest) return null;
                    return listReducer(
                        localCopy,
                        {
                            type: 'refresh',
                            list: serverCopy,
                        }
                    );
                }),
                ...action.lists.map(serverCopy => {
                    const localCopy = state.find(localCopy => localCopy.id === serverCopy.id);
                    if (localCopy) return null;
                    return listReducer(
                        undefined,
                        {
                            type: 'refresh',
                            list: serverCopy,
                        }
                    );
                }),
            ].filter(list => !!list);
        default:
            if (/-list-/.test(action.type)) return state.map(list => list.id === action.listId ? listReducer(list, fwdAction) : list);
            if (/-lists-/.test(action.type)) return state.map(list => listReducer(list, fwdAction));
            return state;
    };
};
