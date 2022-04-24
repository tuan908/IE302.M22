import { FC } from 'react';

interface CommentProps {
  postId?: string;
}
const Comment: FC<CommentProps> = ({ postId }: CommentProps) => {
  return <div>{postId}</div>;
};

export default Comment;
