import { Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getUserProfile } from 'src/service/user.service';

interface User {
  userIdFromLocalStorage: string;
}

interface PinterestImage {
  base64ImageString: string;
  content: string;
  createdTime: Date;
  postId: string;
  postReactCount: number;
  postStatus: string;
  postTitle: string;
  postUrl: string;
  updatedTime: string;
  user: string;
}

type UserInfo = {
  avatarUrl?: string;
  email?: string;
  list: PinterestImage[];
  username: string;
  userId: string;
};

function PinterestProfile() {
  const location = useLocation();

  const userIdFromLocalStorage = location.state as User;

  const [userInfo, setUserInfo] = useState<UserInfo>();

  async function getUserInformation() {
    const rawData = await getUserProfile(userIdFromLocalStorage.toString());
    setUserInfo(rawData.data);
  }

  useEffect(() => {
    getUserInformation();
  }, []);

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Posts
      </Typography>
      <h4>{userInfo?.username}</h4>

      {userInfo!?.list === null
        ? []
        : userInfo?.list.map(
            ({ postReactCount, createdTime, base64ImageString }, index) => {
              return (
                <Grid key={index}>
                  <Typography>{postReactCount}</Typography>
                  <Typography>{createdTime.toString()}</Typography>
                  <img src={base64ImageString} alt="" />
                </Grid>
              );
            }
          )}
    </>
  );
}

export default PinterestProfile;
