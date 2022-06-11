import axios, { AxiosRequestConfig } from 'axios';
import { PinterestUserInfo } from 'src/util/user';

const { create } = axios;
const baseURL = process.env.API_ENDPOINT_URL;
const axiosInstance = create({
  baseURL,
});
const { post: axiosPost, get: axiosGet, put: axiosPut } = axiosInstance;

interface RequestProps extends AxiosRequestConfig {}

interface GetRequestProps extends RequestProps {
  params?: {};
}

const postRequest = async ({ data, baseURL }: RequestProps) => {
  const response = await axiosPost(baseURL!, data);
  console.log(response);
  try {
    return response;
  } catch (error: any) {
    console.error(error.message);
  }
  return response;
};

const getRequest = async ({ baseURL }: GetRequestProps) => {
  console.log(axiosGet(baseURL as string));
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

function requestHandler(request: AxiosRequestConfig<any>) {
  const userInfo = localStorage.getItem('user_info');

  if (userInfo && userInfo !== 'undefined') {
    const { token } = JSON.parse(userInfo!?.toString()) as PinterestUserInfo;

    request.headers!['Authorization'] = `${token}`;
  }
  return request;
}

axiosInstance.interceptors.request.use(requestHandler);

export { postRequest, getRequest, putRequest };
