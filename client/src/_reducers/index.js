import { combineReducers } from 'redux';

import { authReducer } from './auth';
import listsReducer from './lists';
import { themeReducer } from './theme';
import { settingsReducer } from './settings';

export const rootReducer = combineReducers({
    auth: authReducer,
    lists: listsReducer,
    theme: themeReducer,
    settings: settingsReducer,
});
