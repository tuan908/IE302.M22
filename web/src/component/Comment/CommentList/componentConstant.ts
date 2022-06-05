import { PinterestComment } from '..';

enum ACTIONS {
  FETCH_LIST = 'FETCH_ITEM',
  START_EDIT = 'HIDE_ITEM',
  EDIT = 'EDIT',
  CANCEL_EDIT = 'CANCEL_EDIT',
  ON_EDIT = 'ON_EDIT ',
}

interface CommentState {
  list: PinterestComment[];
}

interface CommentAction {
  type: string;
  payload: any;
}

export { ACTIONS, CommentAction, CommentState };
