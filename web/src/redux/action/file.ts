import { AnyAction } from 'redux';
import { LOAD_PHOTO_COMMENT } from '../constants/file';

const loadPhotoCommentList = (isLoad: boolean) => {
  return {
    type: LOAD_PHOTO_COMMENT,
    payload: isLoad,
  } as AnyAction;
};
export default loadPhotoCommentList;
