import axios, { AxiosRequestConfig } from 'axios';
import appHistory from '../config/appHistory';
import requestUrl from '../config/requestUrl';
import UserUtils from '../util/user';

const { create, Cancel } = axios;
const { push: pushBack } = appHistory;
const { AUTH_URL } = requestUrl;
const baseURL = process.env.API_ENDPOINT_URL;
const axiosInstance = create({
  baseURL,
});
const { post: axiosPost, get: axiosGet, put: axiosPut } = axiosInstance;
const logOutState = {
  prePath: window.location.pathname,
  expired: true,
};
const { getUserInfo, saveUserInfoIntoStorage } = UserUtils;

const logOut = () => {
  localStorage.clear();
  pushBack('/login', logOutState);
};

interface RequestProps {
  path?: string;
  body?: object;
  header?: object;
}

interface GetRequestProps extends RequestProps {
  params?: {};
}

const postRequest = async ({ path = '', body = {} }: RequestProps) => {
  try {
    const response = await axiosPost(path, body);
    return response;
  } catch (error: any) {
    console.error(error.message);
  } finally {
    return 1;
  }
};

const getRequest = async ({ path = '', params = {} }: GetRequestProps) => {
  const response = await axiosGet(path, { params });
  try {
    return response;
  } catch (error: unknown) {
    console.error(error);
  }
  return response;
};

const putRequest = async ({ path = '', body = {} }: RequestProps) => {
  const response = await axiosPut(path, body);
  try {
    return response;
  } catch (error: unknown) {
    console.error(error);
  }
  return response;
};

const refreshTokenIfExpired = async (payload: any) => {
  const response = await axiosPost(`${baseURL}${AUTH_URL}`, payload);
  try {
    return response;
  } catch (error: unknown) {
    console.error(error);
  }
  return response;
};

const requestHandler = async (request: AxiosRequestConfig<any>) => {
  const userInfoFromLocalStorage = getUserInfo();
  const {
    accessToken,
    exp,
    refreshToken,
    email: username,
  } = userInfoFromLocalStorage;
  const TIME = new Date().getTime() / 1000;
  const TIME_REFRESH_TOKEN = 300; // seconds

  if (accessToken) {
    const tokenRemainingTime = exp - TIME;
    if (tokenRemainingTime < 0) {
      logOut();
      throw new Cancel('Your token is expired');
    }
    if (tokenRemainingTime < TIME_REFRESH_TOKEN) {
      const payload = { refreshToken, username };
      const newToken = await refreshTokenIfExpired(payload);

      if (!newToken) {
        logOut();
        throw new Cancel('Your token is expired');
      }

      const { data } = newToken;
      saveUserInfoIntoStorage(data);
      const { accessToken } = data;
      return {
        ...userInfoFromLocalStorage,
        accessToken,
      };
    }
    request.headers!['Authorization'] = `Bearer ${accessToken}`;
  }
  return request;
};

axiosInstance.interceptors.request.use(requestHandler);

const RequestServices = {
  postRequest,
  getRequest,
  putRequest,
};

export default RequestServices;
