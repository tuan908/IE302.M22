import { FC, useState, useEffect, useCallback } from 'react';
import { getCurrentUser } from 'src/redux/action/user';

import PinterestReduxHooks from 'src/redux/reduxHooks';
import UserServices from 'src/service/user.services';

interface PinterestProfileProps {}

interface UserProfileProps {
  firstName?: string;
  lastName?: string;
  email?: string;
}

const { usePinterestDispatch, usePinterestSelector } = PinterestReduxHooks;
const { getPhotos, getUserProfile } = UserServices;

const PinterestProfile: FC<PinterestProfileProps> = (
  props: PinterestProfileProps
) => {
  const isLoad = usePinterestSelector((state) => state.userReducer.isLoad);
  const dispatch = usePinterestDispatch();
  const [isOpen, setOpen] = useState<boolean>(false);
  const NUM_IMG_RENDER = 5;
  const [userProfile, setUserProfile] = useState<
    UserProfileProps | undefined
  >();
  const [videos, setVideos] = useState<any>();
  const [photos, setPhotos] = useState<any>();
  const [photoList, setPhotoList] = useState<Array<any> | []>([]);

  const getUserAvatar = async () => {
    const rawData = await getUserProfile();
    try {
      const { data } = rawData;
      setUserProfile(data);
      dispatch(getCurrentUser(data));
    } catch (error) {
      throw new Error(error.message);
    } finally {
      return rawData;
    }
  };

  const getUserVideos = async () => {
    const rawData = await getPhotos();
    try {
      const { data } = rawData;
      const videos = data.filter((item: any) =>
        item.originalName.split('.')[1] === 'mp4' ? true : false
      );
      setVideos(videos.reverse());
    } catch (error) {
      throw new Error(error.message);
    } finally {
      return rawData;
    }
  };

  const getUserPhotos = async () => {
    const rawData = await getPhotos();
    try {
      const { data } = rawData;
      const photos = data?.filter((item: any) =>
        item.originalName.split('.')[1] !== 'mp4' ? true : false
      );
      setPhotos(photos.reverse());
    } catch (error) {
      throw new Error(error.message);
    } finally {
      return rawData;
    }
  };

  useEffect(() => {
    getUserAvatar();
    getUserVideos();
    getUserPhotos();
  }, []);
  const handleDefaultView = useCallback(() => {
    const data = photos?.filter(
      (_: any, index: number) => index < NUM_IMG_RENDER
    );
    setPhotoList(data);
  }, [photos?.length, NUM_IMG_RENDER]);

  useEffect(() => {
    handleDefaultView();
    setOpen(true);
  }, []);
  return (
    <div>
      {photos} {videos} {userProfile} {photoList} {isOpen} {isLoad}
    </div>
  );
};

export default PinterestProfile;
