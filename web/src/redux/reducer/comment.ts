import { AnyAction } from 'redux';
import { HOLD_COMMENT, LOAD_COMMENT } from 'src/redux/constants/comment';

const initState = {
  comment: '',
  comments: [],
};

export default function CommentReducer(
  state = initState,
  { type, payload }: AnyAction
) {
  switch (type) {
    case LOAD_COMMENT:
      return {
        ...state,
        comments: payload,
      };
    case HOLD_COMMENT: {
      return {
        ...state,
        comment: payload,
      };
    }
    default:
      return state;
  }
}
