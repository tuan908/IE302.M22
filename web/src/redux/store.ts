import { combineReducers, compose, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import webStorage from 'redux-persist/lib/storage';
import fileReducer from './reducer/file';
import messageReducer from './reducer/message';
import pinReducer from './reducer/pin';
import userReducer from './reducer/user';
import viewerReducer from './reducer/viewer';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const reducers = {
  viewerReducer,
  fileReducer,
  userReducer,
  messageReducer,
  pinReducer,
};

const mainReducer = combineReducers(reducers);

const persistConfigs = {
  key: 'root',
  storage: webStorage,
  whitelist: ['userReducer'],
};

const reducerWithPersistConfig = persistReducer(persistConfigs, mainReducer);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducerWithPersistConfig, composeEnhancers());

type PinterestRootAppState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export { PinterestRootAppState, AppDispatch };
export const persistedStore = persistStore(store);
export default store;
