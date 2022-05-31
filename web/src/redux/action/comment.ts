import { AnyAction } from 'redux';
import { LOAD_COMMENT } from '../constants/comment';

function loadComments(payload: any): AnyAction {
  return {
    type: LOAD_COMMENT,
    payload,
  };
}

export default loadComments;
