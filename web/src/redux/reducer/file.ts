import { AnyAction } from '@reduxjs/toolkit';
import { LOAD_PHOTO_COMMENT } from '../constants/file';

const initialState = {
  isLoad: false,
};

const fileReducer = (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case LOAD_PHOTO_COMMENT:
      return {
        ...state,
        isLoad: payload,
      };
    default:
      return state;
  }
};

export default fileReducer;
