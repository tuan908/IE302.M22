import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import fileReducer from './reducer/file';
import messageReducer from './reducer/message';
import pinReducer from './reducer/pin';
import userReducer from './reducer/user';
import viewerReducer from './reducer/viewer';

const reducers = {
  viewerReducer,
  fileReducer,
  userReducer,
  messageReducer,
  pinReducer,
};

const mainReducer = combineReducers(reducers);

const store = configureStore({
  reducer: mainReducer,
  devTools: true,
});

console.log(store);
type AppState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export { AppState, AppDispatch };
export default store;
