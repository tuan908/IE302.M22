import { AnyAction } from 'redux';
import { ADD_PINS } from '../constants/pin';

const getPinDataFromApi = (pins: any) => {
  return {
    type: ADD_PINS,
    payLoad: pins,
  } as AnyAction;
};
export default getPinDataFromApi;
