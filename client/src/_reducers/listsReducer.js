import { combineReducers } from 'redux';

import { listReducer } from './listReducer';
import { groupReducer } from './groupReducer';
import { itemReducer } from './itemReducer';
import { settingsReducer } from './settingsReducer';

export const listsReducer = combineReducers({
    lists: listReducer,
    groups: groupReducer,
    items: itemReducer,
    settings: settingsReducer,
});