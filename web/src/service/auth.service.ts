import requestUrl from '../common/requestUrl';
import RequestServices from './request.services';

const { postRequest } = RequestServices;
const {
  AUTH_URL,
  REGISTER_URL,
  UPDATE_USER_PROFILE_URL,
  FORGOT_PASSWORD_URL,
  API_ENDPOINT,
} = requestUrl;

const login = (userLoginInfo: any) =>
  postRequest({
    baseURL: `${API_ENDPOINT}${AUTH_URL}`,
    data: userLoginInfo,
  });

const register = (newUserInfo: any) =>
  postRequest({ baseURL: REGISTER_URL, data: newUserInfo });

const logout = () => localStorage.clear();

const changeInfo = (updatedUserInfo: any) =>
  postRequest({ baseURL: UPDATE_USER_PROFILE_URL, data: updatedUserInfo });

const forgot = (payload: any) =>
  postRequest({ baseURL: FORGOT_PASSWORD_URL, data: payload });

const AuthorizationUtils = {
  forgot,
  login,
  register,
  logout,
  changeInfo,
};

export default AuthorizationUtils;
