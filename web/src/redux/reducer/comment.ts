import { AnyAction } from 'redux';
import { PinterestComment } from 'src/component/Comment';
import { EDIT_COMMENT, LOAD_COMMENT } from 'src/redux/constants/comment';

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

export function editCommentReducer(state: any, action: AnyAction) {
  switch (action.type) {
    case EDIT_COMMENT: {
      const newList = state.list.map((item: PinterestComment) => {
        if (item.commentId === action.payload.commentId) {
          const updatedItem = {
            ...item,
            content: action.payload.content,
          };
          return updatedItem;
        }
        return item;
      });
      return { ...state, list: newList };
    }
    default:
      return state;
  }
}
