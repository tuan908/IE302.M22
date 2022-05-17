import { AnyAction } from 'redux';
import { LOAD_COMMENT } from '../constants/comment';

export default function loadComments(payload: any): AnyAction {
  return {
    type: LOAD_COMMENT,
    payload,
  };
}
