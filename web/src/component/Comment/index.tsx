import FaceIcon from '@mui/icons-material/Face';
import { Avatar } from '@mui/material';
import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import loadComments from 'src/redux/action/comment';
import setMessage from 'src/redux/action/message';
import { usePinterestDispatch, usePinterestSelector } from 'src/redux/hooks';
import fileService from 'src/service/file.services';
import userService from 'src/service/user.services';
import {
  AddComment,
  AvatarWrapper,
  CommentButton,
  Comments,
  Container,
  Status,
  Wrapper,
} from './CommentComponents';

interface Props {
  postId: number;
}

interface PinterestComment {
  userId: string;
  content: string;
  imgId: string;
  avatarUrl: string;
}

function Comment({ postId }: Props) {
  const [data, setData] = useState<PinterestComment>();
  const [comment, setComment] = useState('');
  const [allCommentOfPhoto, setAllCommentOfPhoto] = useState<
    PinterestComment[]
  >([]);
  const userCurrent = usePinterestSelector((state) => state.userReducer.user);
  //
  const state = usePinterestSelector((state) => state.fileReducer.isLoad);
  const dispatch = usePinterestDispatch();

  useEffect(() => {
    setData(userCurrent);
    fileService
      .getAllCommentById(postId.toString())
      .then((res: AxiosResponse<any, any>) => setAllCommentOfPhoto(res.data))
      .catch((err: any) => console.log('ERR: ', err.message));
  }, [state]);

  console.log(data);

  const handleSubmit = (
    e:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    console.log(comment);
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
    document.getElementById('comment')!.textContent = '';
  };

  const resetInput = () => {
    setComment('');
    document.getElementById('comment')!.textContent = '';
  };
  return (
    <Container>
      <AddComment>
        <AvatarWrapper>
          {/* <img src={data!.profilePhotoUrl} alt="" /> */}
          {data ? <Avatar style={{ height: 40, width: 40 }} /> : <FaceIcon />}
        </AvatarWrapper>
        <Comments style={{ flex: '1' }}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              id="comment"
              type="text"
              placeholder="Write your comment"
              style={{ width: '100%', flex: '1' }}
              onChange={(e) => setComment(e.currentTarget.value)}
            />
          </form>
        </Comments>
        <CommentButton
          onClick={(e) => {
            handleSubmit(e);
            resetInput();
          }}
        >
          Comment
        </CommentButton>
      </AddComment>

      {allCommentOfPhoto &&
        allCommentOfPhoto.map((cmt, index) => {
          return (
            <Status key={index}>
              {/* <AvatarWrapper>
                <img src={cmt.} alt="avatar" />
              </AvatarWrapper> */}
              <Wrapper>
                <Avatar
                  style={{ marginRight: '.5rem' }}
                  sx={{ width: '1.5em', height: '1.5em' }}
                />
                <Comments>{cmt.content}</Comments>
              </Wrapper>
            </Status>
          );
        })}
    </Container>
  );
}

export default Comment;
