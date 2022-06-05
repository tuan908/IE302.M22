import requestUrl from '../common/requestUrl';
import { postRequest } from './request.service';

const { AUTH_URL, REGISTER_URL, FORGOT_PASSWORD_URL, API_ENDPOINT } =
  requestUrl;

const login = (userLoginInfo: any) =>
  postRequest({
    baseURL: `${API_ENDPOINT}${AUTH_URL}`,
    data: userLoginInfo,
  });

const register = (newUserInfo: any) =>
  postRequest({ baseURL: REGISTER_URL, data: newUserInfo });

const logout = () => localStorage.clear();

const changeInfo = (userId: string, updatedInfo: any) =>
  postRequest({ baseURL: `/api/user/${userId}/update`, data: updatedInfo });

const forgot = (payload: any) =>
  postRequest({ baseURL: FORGOT_PASSWORD_URL, data: payload });

export { forgot, login, register, logout, changeInfo };
