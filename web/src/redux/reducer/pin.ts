import { AnyAction } from '@reduxjs/toolkit';
import { ADD_PINS } from '../constants/pin';

const initialState = {
  pins: [],
};

const pinReducer = (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case ADD_PINS:
      return {
        pins: payload,
      };
    default:
      return state;
  }
};

export default pinReducer;
