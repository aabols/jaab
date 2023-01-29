import { combineReducers } from 'redux';

import { authReducer } from './authReducer';
import { listsReducer } from './listsReducer';
import { themeReducer } from './themeReducer';

export const rootReducer = combineReducers({
    auth: authReducer,
    lists: listsReducer,
    theme: themeReducer,
});