import moment from 'moment';

export interface PinterestUserInfo {
  userId: string;
  token: string;
  refreshToken: string;
  expiredTime?: string;
}

const saveUserInfoIntoStorage = (userInfo: PinterestUserInfo) =>
  localStorage.setItem('user_info', JSON.stringify(userInfo));

const checkValidRememberMe = (checked: boolean) => {
  const date = moment();
  if (checked) {
    const cachedUserInfo = localStorage.setItem(
      'rememberMe',
      JSON.stringify(date)
    );
    return cachedUserInfo;
  }
  return localStorage.removeItem('rememberMe');
};

const handleRememberMeExpired = () => {
  const cachedDataFromStorage = localStorage.getItem('rememberMe');
  const TIME_EXPIRED = 5; // Remember me valid in 5 days
  let isValidRememberMe = false;

  if (cachedDataFromStorage) {
    const parsedDateFromCachedData = JSON.parse(cachedDataFromStorage);
    const TIME_NOW = moment();

    isValidRememberMe =
      TIME_NOW.diff(parsedDateFromCachedData, 'days', true) > TIME_EXPIRED;
  }
  const result = {
    isValidRememberMe,
    isRememberMeChecked: !!cachedDataFromStorage,
  };
  return result;
};

export {
  checkValidRememberMe,
  handleRememberMeExpired,
  saveUserInfoIntoStorage,
};
