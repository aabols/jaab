import { configureStore } from '@reduxjs/toolkit';
import ThunkMiddleware from 'redux-thunk';

import { rootReducer } from './_reducers';

const store = configureStore({
    reducer: rootReducer,
    middleware: [ThunkMiddleware]
});

export {
    store
};
