import requestUrl from 'src/common/requestUrl';
import requestService from './request.services';

const getFileById = (fileId: string) =>
  requestService.getRequest({
    baseURL: `${requestUrl.GET_USER_FILE_BY_FILE_ID_URL}/${fileId}`,
  });

const deleteFileById = (fileId: string) =>
  requestService.getRequest({
    baseURL: `${requestUrl.DELETE_FILE_BY_FILE_ID_URL}/${fileId}`,
  });

const getAllFile = () =>
  requestService.getRequest({ baseURL: requestUrl.GET_FILE_LIST_URL });

const getAllCommentById = (fileId: string) =>
  requestService.getRequest({
    baseURL: `/api/image/${fileId}/comments/get`,
  });

const updateFileById = (payload: any) =>
  requestService.putRequest({
    baseURL: `${requestUrl.UPDATE_FILE_BY_FILE_ID_URL}/${payload.postID}`,
    data: payload,
  });

const FileServices = {
  getFileById,
  deleteFileById,
  getAllFile,
  getAllCommentById,
  updateFileById,
};

export default FileServices;
