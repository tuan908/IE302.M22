import { AnyAction } from 'redux';
import { STATE_LOGIN } from '../constants/login';

interface LoginState {
  refreshToken: string;
  token: string;
  userId: string;
  expiredTime: string;
}

const initState: LoginState = {
  refreshToken: '',
  token: '',
  userId: '',
  expiredTime: '',
};

export default function initLoginStateReducer(
  state = initState,
  { type, payload }: AnyAction
) {
  switch (type) {
    case STATE_LOGIN: {
      return {
        ...state,
        ...payload,
      };
    }
    default:
      return state;
  }
}
