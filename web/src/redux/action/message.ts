import { AnyAction } from 'redux';
import { SET_MESSAGE } from '../constants/message';

const setMessage = (content: string, type: string) =>
  ({
    payload: {
      content,
      type,
    },
    type: SET_MESSAGE,
  } as AnyAction);

export default setMessage;
