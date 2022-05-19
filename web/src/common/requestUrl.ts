const AUTH_URL = '/api/user/login';
const REGISTER_URL = '/api/user/register';
const REFRESH_TOKEN_URL = '/api/user/token/refresh';
const FORGOT_PASSWORD_URL = '/api/user/forgotPassword';

const POST_USER_INFO_URL = '/api/user/post';
const POST_HAVE_TICKET = '/api/user/postWithTicket';
const GET_PHOTO_LIST_URL = '/api/user/getPhotos';
const POST_USER_COMMENT_URL = '/api/comment/create';
const API_ENDPOINT = 'http://localhost:8081';

const GET_USER_FILE_BY_FILE_ID_URL = '/api/file/getFileById';
const DELETE_FILE_BY_FILE_ID_URL = '/api/file/deleteFileById';
const GET_LINK_DOWNLOAD_FILE_URL = '/api/file/download';
const GET_FILE_LIST_URL = '/api/file/getAllFile';
const GET_COMMENT_LIST_BY_POST_ID_URL = '/api/file/getAllCommentById';
const UPDATE_FILE_BY_FILE_ID_URL = '/api/file/updateFileById';

const requestUrl = {
  AUTH_URL,
  REGISTER_URL,
  FORGOT_PASSWORD_URL,
  POST_USER_INFO_URL,
  POST_HAVE_TICKET,
  GET_PHOTO_LIST_URL,
  GET_USER_FILE_BY_FILE_ID_URL,
  DELETE_FILE_BY_FILE_ID_URL,
  GET_LINK_DOWNLOAD_FILE_URL,
  GET_FILE_LIST_URL,
  POST_USER_COMMENT_URL,
  GET_COMMENT_LIST_BY_POST_ID_URL,
  UPDATE_FILE_BY_FILE_ID_URL,
  API_ENDPOINT,
  REFRESH_TOKEN_URL,
};

export default requestUrl;
