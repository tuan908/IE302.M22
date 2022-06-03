import { PinterestComment } from '..';

export enum ACTIONS {
  FETCH_LIST = 'FETCH_ITEM',
  START_EDIT = 'HIDE_ITEM',
  EDIT = 'EDIT',
  CANCEL_EDIT = 'CANCEL_EDIT',
}

export interface CommentState {
  list: PinterestComment[];
}

export interface CommentAction {
  type: string;
  payload: any;
}
