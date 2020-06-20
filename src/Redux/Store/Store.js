import { createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import CombinedReducers from '../Reducers/AuthReducers'

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth']
}

const persistedReducer = persistReducer(persistConfig, CombinedReducers);

const store = createStore(persistedReducer);

export const persistor = persistStore(store);

export default store;