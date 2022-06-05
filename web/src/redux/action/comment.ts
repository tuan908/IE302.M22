import { AnyAction } from 'redux';
import { HOLD_COMMENT, LOAD_COMMENT } from '../constants/comment';

function loadComments(payload: any): AnyAction {
  return {
    type: LOAD_COMMENT,
    payload,
  };
}

export function holdComment(payload: any): AnyAction {
  return {
    type: HOLD_COMMENT,
    payload,
  };
}

export default loadComments;
