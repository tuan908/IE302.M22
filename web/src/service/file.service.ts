import requestUrl from 'src/util/requestUrl';
import { getRequest, putRequest } from './request.service';

const getFileById = (fileId: string) =>
  getRequest({
    baseURL: `${requestUrl.GET_USER_FILE_BY_FILE_ID_URL}/${fileId}`,
  });

const deleteFileById = (fileId: string) =>
  getRequest({
    baseURL: `${requestUrl.DELETE_FILE_BY_FILE_ID_URL}/${fileId}`,
  });

const getAllFile = () => getRequest({ baseURL: requestUrl.GET_FILE_LIST_URL });

const getAllCommentById = (fileId: string) =>
  getRequest({
    baseURL: `/api/image/${fileId}/comments/get`,
  });

const updateFileById = (payload: any) =>
  putRequest({
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
