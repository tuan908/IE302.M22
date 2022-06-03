import { PinterestComment } from '..';
import { ACTIONS, CommentAction, CommentState } from './constants';

export const reducer = (state: CommentState, action: CommentAction) => {
  switch (action.type) {
    case ACTIONS.EDIT: {
      const newList = state.list.map((item: PinterestComment) => {
        const isUpdatedItem = item.commentId === action.payload.commentId;
        if (isUpdatedItem) {
          const updatedItem: PinterestComment = {
            ...item,
            content: action.payload.content,
            isEditing: false,
          };
          console.log(updatedItem);
          return updatedItem;
        }
        return item;
      });
      return { ...state, list: newList };
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
    case ACTIONS.FETCH_LIST: {
      return {
        ...state,
        list: action.payload,
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
};
