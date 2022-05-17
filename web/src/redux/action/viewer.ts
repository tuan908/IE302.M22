import { AnyAction } from 'redux';
import { SHOW_VIEWER, HIDE_VIEWER } from '../constants/viewer';

export const showViewer = (fileId: string, isFullScreenViewer = false) => {
  return {
    type: SHOW_VIEWER,
    payload: {
      fileId,
      isFullScreenViewer,
    },
  } as AnyAction;
};

export const hideViewer = () => {
  return {
    type: HIDE_VIEWER,
  } as AnyAction;
};
