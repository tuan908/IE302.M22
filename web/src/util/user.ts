const getUserInfoFromStorage = () => {
  const userInfo = localStorage.getItem('userInfo');
  if (!userInfo) {
    return {};
  } else {
    return JSON.parse(userInfo);
  }
};

const saveUserInfoIntoStorage = (userInfo: any) =>
  localStorage.setItem('userInfo', JSON.stringify(userInfo));

const parseJwt = (token: string) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
};
