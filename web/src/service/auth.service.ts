import requestUrl from '../config/requestUrl';
import RequestServices from './request.services';

const { postRequest } = RequestServices;
const { AUTH_URL, REGISTER_URL, UPDATE_USER_PROFILE_URL, FORGOT_PASSWORD_URL } =
  requestUrl;

const handleUserLogin = (userLoginInfo: any) =>
  postRequest({ path: AUTH_URL, body: userLoginInfo });

const registerNewUser = (newUserInfo: any) =>
  postRequest({ path: REGISTER_URL, body: newUserInfo });

const handleLogout = () => localStorage.clear();

const handleUpdateUserInfo = (updatedUserInfo: any) =>
  postRequest({ path: UPDATE_USER_PROFILE_URL, body: updatedUserInfo });

const handleForgotPassword = (payload: any) =>
  postRequest({ path: FORGOT_PASSWORD_URL, body: payload });

const AuthorizationUtils = {
  handleForgotPassword,
  handleUserLogin,
  registerNewUser,
  handleLogout,
  handleUpdateUserInfo,
};

export default AuthorizationUtils;
