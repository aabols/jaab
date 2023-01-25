import { combineReducers } from 'redux';

import { authReducer } from './authReducer';
import { listsReducer } from './listsReducer';

const rootReducer = combineReducers({
    auth: authReducer,
    lists: listsReducer
});

export {
    rootReducer
};