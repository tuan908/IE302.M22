import moment from 'moment';

interface UserInfo {
  role?: string;
  accessToken?: string;
  refreshToken?: string;
  exp?: string;
  email?: string;
  status?: string;
  id?: string;
}

const getUserInfoFromStorage = (): UserInfo => {
  const userInfo = localStorage.getItem('userInfo');
  if (!userInfo) {
    return {};
  } else {
    return JSON.parse(userInfo);
  }
};

const saveUserInfoIntoStorage = (userInfo: UserInfo) =>
  localStorage.setItem('userInfo', JSON.stringify(userInfo));

const parseJwt = (token: string) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    Buffer.from(base64, 'base64').toString()
  );

  return JSON.parse(jsonPayload);
};

const getUserInfo = () => {
  const userInfoFromStorage = getUserInfoFromStorage();
  const { accessToken, refreshToken } = userInfoFromStorage;

  if (accessToken) {
    const userAfterParse = parseJwt(accessToken);
    const { user, exp } = userAfterParse;

    return {
      role: 'admin',
      accessToken,
      refreshToken,
      exp,
      email: user.email,
      status: user.status,
      id: user._id,
    };
  }
  return {};
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
