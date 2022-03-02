import requestUrl from '../config/requestUrl';
import requestService from './request.services';

const {
  GET_USER_PROFILE_URL,
  POST_USER_INFO_URL,
  GET_PHOTO_LIST_URL,
  POST_HAVE_TICKET,
  POST_USER_COMMENT_URL,
} = requestUrl;
const { getRequest, postRequest } = requestService;

const getUserProfile = () => getRequest({ path: GET_USER_PROFILE_URL });

const postUserInfo = (userData: any) =>
  postRequest({
    body: userData,
    path: POST_USER_INFO_URL,
  });

const getPhotos = () => getRequest({ path: GET_PHOTO_LIST_URL });

const postWithTicket = (userData: any) =>
  postRequest({
    path: POST_HAVE_TICKET,
    body: userData,
  });

const postComment = (comments: any) =>
  postRequest({
    path: POST_USER_COMMENT_URL,
    body: comments,
  });

const UserServices = {
  getUserProfile,
  postUserInfo, //Post khi user post ảnh mới lên
  getPhotos,
  postWithTicket,
  postComment,
};

export default UserServices;
