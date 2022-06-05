import FaceIcon from '@mui/icons-material/Face';
import Send from '@mui/icons-material/Send';
import { Avatar } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import setMessage from 'src/redux/action/message';
import { usePinterestDispatch, usePinterestSelector } from 'src/redux/hooks';
import { postComment } from 'src/service/user.service';
import CommentList from './CommentList';
import { AddComment, AvatarWrapper, Comments, Container } from './Component';

interface Props {
  postId: number;
}

interface PinterestComment {
  commentId?: string;
  userId: string;
  content: string;
  imgId: string;
  avatarUrl: string;
  isEditing?: boolean;
}

function Comment({ postId }: Props) {
  const [data, setData] = useState<PinterestComment>();
  const [comment, setComment] = useState('');
  const userCurrent = usePinterestSelector((state) => state.userReducer.user);
  const containerRef = useRef<HTMLDivElement>(null);
  const commentInputRef = useRef<HTMLInputElement>(null);
  const dispatch = usePinterestDispatch();

  useEffect(() => {
    setData(userCurrent);
  }, []);

  const resetInput = () => {
    setComment('');
    if (commentInputRef.current) {
      commentInputRef.current.value = '';
    }
  };

  const handleSubmit = (
    e:
      | React.MouseEvent<SVGSVGElement, MouseEvent>
      | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const commentInfo: PinterestComment = {
      content: comment,
      userId: userCurrent.userId,
      avatarUrl: userCurrent.avatarUrl,
      imgId: postId.toString(),
    };

    postComment(commentInfo)
      .then(() => {
        dispatch(setMessage('Success!!!', 'success'));
      })
      .catch((err: any) => {
        console.log('Err: ', err.message);
        dispatch(setMessage('Sorry, Failed.', 'error'));
      });
    resetInput();
  };

  return (
    <Container ref={containerRef}>
      <AddComment>
        <AvatarWrapper>
          {data ? <Avatar style={{ height: 30, width: 30 }} /> : <FaceIcon />}
        </AvatarWrapper>

        <Comments style={{ flex: '1' }}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              ref={commentInputRef}
              type="text"
              placeholder="Write your comment here..."
              style={{ width: '100%', flex: '1', fontSize: '1rem' }}
              onChange={(e) => setComment(e.currentTarget.value)}
            />
          </form>
        </Comments>

        <Send onClick={(e) => handleSubmit(e)} />
      </AddComment>

      <CommentList postId={postId} />
    </Container>
  );
}

export default Comment;
export { PinterestComment };
