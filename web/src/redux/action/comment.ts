import { AnyAction } from 'redux';
import { LOAD_COMMENT, EDIT_COMMENT } from '../constants/comment';

function loadComments(payload: any): AnyAction {
  return {
    type: LOAD_COMMENT,
    payload,
  };
}

function editComment(payload: any): AnyAction {
	return {
		type: EDIT_COMMENT,
		payload,
	};
}

export default loadComments;
export { editComment }
