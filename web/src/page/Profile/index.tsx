import { useLocation } from 'react-router-dom';

interface UserInfoProps {
  avatarUrl?: string;
  username?: string;
  email?: string;
}

function PinterestProfile() {
  const location = useLocation();
  console.log(location.state);
  const { avatarUrl, email, username } = location.state as UserInfoProps;

  return (
    <>
      <img src={avatarUrl} alt="" />
      <h4>{email}</h4>
      <h4>{username}</h4>
    </>
  );
}

export default PinterestProfile;
