import FaceIcon from '@mui/icons-material/Face';
import Send from '@mui/icons-material/Send';
import { Avatar } from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import loadComments from 'src/redux/action/comment';
import setMessage from 'src/redux/action/message';
import { usePinterestDispatch, usePinterestSelector } from 'src/redux/hooks';
import fileService from 'src/service/file.services';
import userService from 'src/service/user.services';
import CommentList from '../CommentList';
import {
  AddComment,
  AvatarWrapper,
  Comments,
  Container,
} from './CommentComponents';

interface Props {
  postId: number;
}

export interface PinterestComment {
  commentId?: string;
  userId: string;
  content: string;
  imgId: string;
  avatarUrl: string;
  isEdited?: boolean;
}

function Comment({ postId }: Props) {
  const [data, setData] = useState<PinterestComment>();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState<PinterestComment[]>([]);
  const userCurrent = usePinterestSelector((state) => state.userReducer.user);
  const containerRef = useRef<HTMLDivElement>(null);
  const commentInputRef = useRef<HTMLInputElement>(null);
  const state = usePinterestSelector((state) => state.fileReducer.isLoad);
  const dispatch = usePinterestDispatch();

  async function getAllCommentByImgId(postId: string) {
    try {
      const raw = await fileService.getAllCommentById(postId);
      setComments(raw.data);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    setData(userCurrent);
    getAllCommentByImgId(postId.toString());
  }, [state]);

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

    userService
      .postComment(commentInfo)
      .then(() => {
        dispatch(setMessage('Success!!.', 'success'));
        dispatch(loadComments(!state));
      })
      .catch((err: any) => {
        console.log('Err: ', err.message);
        dispatch(setMessage('Sorry, Failed.', 'error'));
      });
    resetInput();
  };

  const resetInput = () => {
    setComment('');
    if (commentInputRef.current) {
      commentInputRef.current.value = '';
    }
  };

  return (
    <Container ref={containerRef}>
      <AddComment>
        <AvatarWrapper>
          {data ? <Avatar style={{ height: 40, width: 40 }} /> : <FaceIcon />}
        </AvatarWrapper>
        <Comments style={{ flex: '1' }}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              ref={commentInputRef}
              type="text"
              placeholder="Write your comment"
              style={{ width: '100%', flex: '1' }}
              onChange={(e) => setComment(e.currentTarget.value)}
              autoFocus
            />
          </form>
        </Comments>
        <Send
          style={{ borderRadius: '50%' }}
          onClick={(e) => {
            handleSubmit(e);
          }}
        />
      </AddComment>

      <CommentList list={comments} />
    </Container>
  );
}

export default Comment;
