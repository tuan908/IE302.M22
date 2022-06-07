import { Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getUserProfile } from 'src/service/user.service';

interface User {
  userId: string;
}

type ImageApi = {
  comments: [];
  createdTime: Date;
  imageId: string;
  updatedTime: Date;
  content: string;

  postStatus: string;
  postReactCount?: number;
  postId?: string;
  postTitle: string;
};

type UserInfo = {
  avatarUrl?: string;
  email?: string;
  list: Array<ImageApi>;
  user: string;
  userId: string;
};

function PinterestProfile() {
  const location = useLocation();

  const { userId } = location.state as User;

  const [userInfo, setUserInfo] = useState<UserInfo>();

  async function getUserInformation() {
    const rawData = await getUserProfile(userId);
    console.log(rawData.data);
    setUserInfo(rawData.data);
  }

  useEffect(() => {
    getUserInformation();
  }, []);
  console.log(userInfo?.list);

  return (
    <>
      <Typography variant="h5" gutterBottom>
        Posts
      </Typography>
      <h4>{userInfo?.user}</h4>

      {userInfo!?.list.map((item, index) => {
        console.log(item);
        return (
          <div key={index}>
            <Typography>{item!?.postReactCount}</Typography>
            <Typography>{item!?.createdTime.toString()}</Typography>
          </div>
        );
      })}
    </>
  );
}

export default PinterestProfile;
