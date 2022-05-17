import moment from 'moment';

interface UserInfo {
  role?: string;
  token?: string;
  refreshToken?: string;
  expiredTime?: string;
}

const getJwtTokenFromStorage = (): UserInfo => {
  const token = localStorage.getItem('token');
  console.log(token);

  if (!token) {
    return {};
  } else {
    return {
      token,
    };
  }
};

const saveUserInfoIntoStorage = (userInfo: UserInfo) =>
  localStorage.setItem('userInfo', JSON.stringify(userInfo));

const getUserInfo = () => {
  const userInfoFromStorage = getJwtTokenFromStorage();
  const { ...info } = userInfoFromStorage;
  return {
    ...info,
  };
};

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

const UserUtils = {
  getUserInfo,
  checkValidRememberMe,
  handleRememberMeExpired,
  saveUserInfoIntoStorage,
};

export default UserUtils;
