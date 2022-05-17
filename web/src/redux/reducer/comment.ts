import { AnyAction } from 'redux';
import { LOAD_COMMENT } from 'src/redux/constants/comment';

const defaultState = {};

export default function CommentReducer(
  state = defaultState,
  { type, payload }: AnyAction
) {
  switch (type) {
    case LOAD_COMMENT:
      return {
        ...state,
        comments: payload,
      };
    default:
      return state;
  }
}
