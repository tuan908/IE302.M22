import requestUrl from 'src/config/requestUrl';
import requestService from './request.services';

const getFileById = (fileId: string) =>
  requestService.getRequest({
    path: `${requestUrl.GET_USER_FILE_BY_FILE_ID_URL}/${fileId}`,
  });

const deleteFileById = (fileId: string) =>
  requestService.getRequest({
    path: `${requestUrl.DELETE_FILE_BY_FILE_ID_URL}/${fileId}`,
  });

const getAllFile = () =>
  requestService.getRequest({ path: requestUrl.GET_FILE_LIST_URL });

const getAllCommentById = (fileId: string) =>
  requestService.getRequest({
    path: `${requestUrl.GET_COMMENT_LIST_BY_POST_ID_URL}/${fileId}`,
  });

const updateFileById = (payload: any) =>
  requestService.putRequest({
    path: `${requestUrl.UPDATE_FILE_BY_FILE_ID_URL}/${payload.postID}`,
    body: payload,
  });

export const FileServices = {
  getFileById,
  deleteFileById,
  getAllFile,
  getAllCommentById,
  updateFileById,
};
