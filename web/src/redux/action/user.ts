import { AnyAction } from 'redux';
import { GET_CURRENT_USER, LOAD_PHOTO_USER } from '../constants/user';

export const getCurrentUser = (user: any) => {
  return {
    type: GET_CURRENT_USER,
    payLoad: user,
  } as AnyAction;
};

//Dùng để tự động load lại hình ảnh khi user vừa mới post xong!!
export const loadPhotos = (isLoad: boolean) => {
  return {
    type: LOAD_PHOTO_USER,
    payLoad: isLoad,
  } as AnyAction;
};
