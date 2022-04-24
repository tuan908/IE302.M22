import { FC } from 'react';

interface PinProps {
  isVideo?: boolean;
  webformatURL?: string;
  user?: string;
  userId?: string;
  likes?: number;
  postId?: string;
  tags: string;
  views: string;
}

const Pin: FC<PinProps> = ({
  isVideo,
  webformatURL,
  user,
  userId,
  likes,
  postId,
  tags,
  views,
}: PinProps) => {
  return (
    <div
      style={{ display: 'inline-block', width: '100%', borderRadius: '1em' }}
    >
      <img
        src={webformatURL}
        alt=""
        style={{ display: 'block', width: '100%' }}
      />
    </div>
  );
};

export default Pin;
