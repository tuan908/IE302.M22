import { AnyAction } from 'redux';
import { GET_CURRENT_USER, LOAD_PHOTO_USER } from '../constants/user';

export const getCurrentUser = (user: any) => {
  return {
    type: GET_CURRENT_USER,
    payload: user,
  } as AnyAction;
};

export const loadPhotos = (isLoad: boolean) => {
  return {
    type: LOAD_PHOTO_USER,
    payload: isLoad,
  } as AnyAction;
};
