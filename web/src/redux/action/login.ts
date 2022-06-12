import { AnyAction } from 'redux';
import { STATE_LOGIN } from '../constants/login';

export default function initLoginStateAfterLogin(payload: any): AnyAction {
  return {
    type: STATE_LOGIN,
    payload,
  };
}
