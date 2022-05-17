import axios, { AxiosRequestConfig } from 'axios';
import appHistory from '../common/appHistory';
import requestUrl from '../common/requestUrl';
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

interface RequestProps extends AxiosRequestConfig {}

interface GetRequestProps extends RequestProps {
  params?: {};
}

const postRequest = async ({ data, baseURL }: RequestProps) => {
  const response = await axiosPost(baseURL as string, data);
  try {
    return response;
  } catch (error: any) {
    console.error(error.message);
  }
  return response;
};

const getRequest = async ({ baseURL, data }: GetRequestProps) => {
  const response = await axiosGet(baseURL as string);
  try {
    return response;
  } catch (error: unknown) {
    console.error(error);
  }
  return response;
};

const putRequest = async ({ baseURL, data }: RequestProps) => {
  const response = await axiosPut(baseURL as string, data);
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

  console.log(userInfoFromLocalStorage);
  const { expiredTime, refreshToken, token } = userInfoFromLocalStorage;
  const TIME = new Date().getTime() / 1000;
  const TIME_REFRESH_TOKEN = 300; // seconds

  if (token) {
    const EXPIRED_TIME = Number(expiredTime!);
    const tokenRemainingTime = EXPIRED_TIME - TIME;
    if (tokenRemainingTime < 0) {
      logOut();
      throw new Cancel('Your token is expired');
    }
    if (tokenRemainingTime < TIME_REFRESH_TOKEN) {
      const payload = { refreshToken };
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
    request.headers!['Authorization'] = `${token}`;
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
