import requestUrl from '../config/requestUrl';
import RequestServices from './request.services';

const { postRequest } = RequestServices;
const { AUTH_URL, REGISTER_URL, UPDATE_USER_PROFILE_URL, FORGOT_PASSWORD_URL } =
  requestUrl;

const login = (userLoginInfo: any) =>
  postRequest({ path: AUTH_URL, body: userLoginInfo });

const register = (newUserInfo: any) =>
  postRequest({ path: REGISTER_URL, body: newUserInfo });

const logout = () => localStorage.clear();

const changeInfo = (updatedUserInfo: any) =>
  postRequest({ path: UPDATE_USER_PROFILE_URL, body: updatedUserInfo });

const forgot = (payload: any) =>
  postRequest({ path: FORGOT_PASSWORD_URL, body: payload });

const AuthorizationUtils = {
  forgot,
  login,
  register,
  logout,
  changeInfo,
};

export default AuthorizationUtils;
