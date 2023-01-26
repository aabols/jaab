import { combineReducers } from 'redux';

import { authReducer } from './authReducer';
import { listsReducer } from './listsReducer';

export const rootReducer = combineReducers({
    auth: authReducer,
    lists: listsReducer
});