import { PinterestComment } from '..';
import { ACTIONS, CommentAction, CommentState } from './componentConstant';

export default function reducer(state: CommentState, action: CommentAction) {
  switch (action.type) {
    case ACTIONS.FETCH_LIST: {
      return {
        ...state,
        list: action.payload,
      };
    }

    case ACTIONS.START_EDIT: {
      const newList = state.list.map((item: PinterestComment) => {
        if (item.commentId === action.payload.id) {
          return {
            ...item,
            isEditing: true,
          };
        }
        return item;
      });
      return { ...state, list: newList };
    }

    case ACTIONS.ON_EDIT: {
      return {
        ...state,
        comment: action.payload,
      };
    }

    case ACTIONS.EDIT: {
      const index = state.list.findIndex(
        (item) => item.commentId === action.payload.commentId
      );
      const newList = [...state.list];
      newList[index].content = action.payload.content;
      newList[index].isEditing = false;

      return {
        ...state,
        list: newList,
      };
    }

    case ACTIONS.CANCEL_EDIT: {
      const newList = state.list.map((item: PinterestComment) => {
        const isUpdatedItem = item.commentId === action.payload.commentId;

        if (isUpdatedItem) {
          const newStatusItem = {
            ...item,
            isEditing: false,
          };
          return newStatusItem;
        }
        return item;
      });

      return {
        ...state,
        list: newList,
      };
    }

    default:
      return state;
  }
}
