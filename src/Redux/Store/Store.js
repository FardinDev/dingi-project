import { createStore, applyMiddleware } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import CombinedReducers from '../Reducers/index'
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'token']
}
const sagaMiddleware = new createSagaMiddleware();

const persistedReducer = persistReducer(persistConfig, CombinedReducers);

const store = (process.env.NODE_ENV === 'development') ? 
    createStore(persistedReducer, applyMiddleware(logger, sagaMiddleware))
    :createStore(persistedReducer, applyMiddleware(sagaMiddleware));


export const persistor = persistStore(store);
export const dispatchAction = store.dispatch;
export default store;