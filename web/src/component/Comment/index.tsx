import { FC } from 'react';

interface PinterestCommentProps {
  postId?: string;
}
const PinterestComment: FC<PinterestCommentProps> = ({
  postId,
}: PinterestCommentProps) => {
  return <div>{postId}</div>;
};

export default PinterestComment;
