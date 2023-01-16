import { configureStore } from '@reduxjs/toolkit';
import ThunkMiddleware from 'redux-thunk';

import { rootReducer } from './_reducers/rootReducer';

const store = configureStore({
    reducer: rootReducer,
    middleware: [ThunkMiddleware]
});

export {
    store
};