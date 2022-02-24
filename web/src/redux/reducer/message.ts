import { AnyAction } from '@reduxjs/toolkit';
import { SET_MESSAGE } from '../constants/message';

const initialState = {
  message: {},
};

const messageReducer = (
  state = initialState.message,
  { type, payload }: AnyAction
) => {
  switch (type) {
    case SET_MESSAGE:
      return payload || null;
    default:
      return state;
  }
};
export default messageReducer;
