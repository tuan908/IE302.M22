import { FC } from 'react';

interface PostProps {
  isOpen?: boolean;
  handleClose: () => void;
}

const PinterestPost: FC<PostProps> = ({ isOpen, handleClose }: PostProps) => {
  return <div>Post</div>;
};

export default PinterestPost;
