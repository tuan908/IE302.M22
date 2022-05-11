import { AnyAction } from '@reduxjs/toolkit';
import { GET_CURRENT_USER, LOAD_PHOTO_USER } from '../constants/user';

const initialState = {
  user: {},
  isLoad: false,
};

const userReducer = (state = initialState, { payload, type }: AnyAction) => {
  switch (type) {
    case GET_CURRENT_USER:
      return {
        ...state,
        user: payload,
      };
    case LOAD_PHOTO_USER:
      return {
        ...state,
        isLoad: payload,
      };
    default:
      return state;
  }
};

export default userReducer;
