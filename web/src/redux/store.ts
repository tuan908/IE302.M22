import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query';
import { combineReducers } from 'redux';
import { pixabayApi } from '../hook/useGetImageByKeyword';
import commentReducer from './reducer/comment';
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
  commentReducer,
  [pixabayApi.reducerPath]: pixabayApi.reducer,
};

const mainReducer = combineReducers(reducers);

const store = configureStore({
  reducer: mainReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pixabayApi.middleware),
});
setupListeners(store.dispatch);

type AppState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export { AppState, AppDispatch };
export default store;
