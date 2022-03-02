import { FC } from 'react';

interface PinterestPinProps {
  isVideo?: boolean;
  photoUrl?: string;
  user?: string;
  userId?: string;
  likes?: number;
  postId?: string;
  tags: string;
  views: number;
}

const PinterestPin: FC<PinterestPinProps> = ({
  isVideo,
  photoUrl,
  user,
  userId,
  likes,
  postId,
  tags,
  views,
}: PinterestPinProps) => {
  return <>{user}</>;
};

export default PinterestPin;
