import { AnyAction } from '@reduxjs/toolkit';
import { HIDE_VIEWER, SHOW_VIEWER } from '../constants/viewer';

const initialState = {
  fileId: null,
  visible: false,
};

const viewerReducer = (state = initialState, { type, payload }: AnyAction) => {
  switch (type) {
    case SHOW_VIEWER:
      return {
        ...state,
        fileId: payload.fileId,
        isFullScreenViewer: payload.isFullScreenViewer,
        visible: true,
      };
    case HIDE_VIEWER:
      return {
        ...state,
        fileId: null,
        visible: false,
      };
    default:
      return state;
  }
};

export default viewerReducer;
