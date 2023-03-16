import groupReducer from './group';

const initialState = [];

export default function groupsReducer(state = initialState, action) {
    const fwdAction = { ...action, type: action.type.replace(/-groups?-/, '') };
    switch (action.type) {
        case '-groups-create-request':
            return [...state, groupReducer(undefined, fwdAction)];
        case '-group-create-failure':
            return state.filter(group => group.id !== action.groupId);
        case '-group-delete-success':
            return state.filter(group => group.id !== action.groupId);
        case '-groups-refresh':
            return [
                ...state.map(localCopy => {
                    const serverCopy = action.groups.find(serverCopy => serverCopy.id === localCopy.id);
                    const ongoingRequest = localCopy.ongoingRequest;
                    if (!serverCopy && !ongoingRequest) return null;
                    return groupReducer(
                        localCopy,
                        {
                            type: 'refresh',
                            group: serverCopy,
                        }
                    );
                }),
                ...action.groups.map(serverCopy => {
                    const localCopy = state.find(localCopy => localCopy.id === serverCopy.id);
                    if (localCopy) return null;
                    return groupReducer(
                        undefined,
                        {
                            type: 'refresh',
                            group: serverCopy,
                        }
                    );
                }),
            ].filter(group => !!group);
        default:
            if (/-group-/.test(action.type)) return state.map(group => group.id === action.groupId ? groupReducer(group, fwdAction) : group);
            if (/-groups-/.test(action.type)) return state.map(group => groupReducer(group, fwdAction));
            return state;
    };
};
