import requestUrl from '../common/requestUrl';
import requestService from './request.services';

const {
  GET_USER_PROFILE_URL,
  POST_USER_INFO_URL,
  GET_PHOTO_LIST_URL,
  POST_HAVE_TICKET,
  POST_USER_COMMENT_URL,
} = requestUrl;
const { getRequest, postRequest } = requestService;

const getUserProfile = () => getRequest({ baseURL: GET_USER_PROFILE_URL });

const postUserInfo = (userData: any) =>
  postRequest({
    data: userData,
    baseURL: POST_USER_INFO_URL,
  });

const getPhotos = () => getRequest({ baseURL: GET_PHOTO_LIST_URL });

const postWithTicket = (userData: any) =>
  postRequest({
    baseURL: POST_HAVE_TICKET,
    data: userData,
  });

const postComment = (comments: any) =>
  postRequest({
    baseURL: POST_USER_COMMENT_URL,
    data: comments,
  });

const UserServices = {
  getUserProfile,
  postUserInfo,
  getPhotos,
  postWithTicket,
  postComment,
};

export default UserServices;
