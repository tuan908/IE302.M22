import { FC } from 'react';

interface PinterestPostProps {
  isOpen?: boolean;
  handleClose: () => void;
}

const PinterestPost: FC<PinterestPostProps> = ({
  isOpen,
  handleClose,
}: PinterestPostProps) => {
  return <div>Post</div>;
};

export default PinterestPost;
