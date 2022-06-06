import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getUserProfile } from 'src/service/user.service';
import { PostDetail } from 'src/ui/Post';

interface UserInfoProps {
  avatarUrl?: string;
  username?: string;
  email?: string;
  userId: string;
}

function PinterestProfile() {
  const location = useLocation();
  console.log(location.state);
  const { avatarUrl, email, username, userId } =
    location.state as UserInfoProps;

  const [userInfo, setUserInfo] = useState<PostDetail>();

  async function getUserInformation() {
    const rawData = await getUserProfile(userId);
    setUserInfo(rawData.data);
  }

  useEffect(() => {
    getUserInformation();
  }, []);
  console.log(userInfo);
  return (
    <>
      <img src={avatarUrl} alt="" />
      <h4>{email}</h4>
      <h4>{username}</h4>
    </>
  );
}

export default PinterestProfile;
