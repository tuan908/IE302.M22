import FaceIcon from '@mui/icons-material/Face';
import Send from '@mui/icons-material/Send';
import { Avatar, CircularProgress } from '@mui/material';
import React, { useEffect, useRef, useState, useTransition } from 'react';
import setMessage from 'src/redux/action/message';
import { usePinterestDispatch, usePinterestSelector } from 'src/redux/hooks';
import fileService from 'src/service/file.service';
import { postComment } from 'src/service/user.service';
import CommentList from './CommentList';
import { AddComment, AvatarWrapper, Comments, Container } from './Component';

interface Props {
  postId: number;
  imageUrl: string;
}

interface PinterestComment {
  commentId?: string;
  userId: string;
  content: string;
  imgId: string;
  avatarUrl: string;
  isEditing?: boolean;
  imageUrl: string;
  username: string;
  isNeedReload?: boolean;
}

function Comment({ postId, imageUrl }: Props) {
  const [data, setData] = useState<PinterestComment>();
  const [comment, setComment] = useState('');
  const userCurrent = usePinterestSelector((state) => state.userReducer.user);
  const [comments, setComments] = useState<PinterestComment[]>([]);
  const [isPending, startTransition] = useTransition();
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

  async function loadCommentList() {
    const raw = await fileService.getAllCommentById(postId.toString());
    startTransition(() => setComments(raw.data));
  }

  useEffect(() => {
    loadCommentList();
  }, []);

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
      imageUrl,
      username: userCurrent.username,
    };

    postComment(commentInfo)
      .then(async () => {
        dispatch(setMessage('Success!!!', 'success'));
        const raw = await fileService.getAllCommentById(postId.toString());
        startTransition(() => setComments(raw.data));
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
      {isPending && <CircularProgress />}
      {!isPending && <CommentList comments={comments} />}
    </Container>
  );
}

export default Comment;
export { PinterestComment };
