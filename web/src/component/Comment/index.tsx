import { AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import { PixabayPhoto } from 'src/api';
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
  UserName,
  Wrapper,
} from './CommentComponents';

interface Props {
  postId: number;
}

interface UserDataResponse extends PixabayPhoto {
  _id: string;
  firstName: string;
  lastName: string;
  profilePhotoUrl: string;
  comments: PinterestComment[];
}

interface PinterestComment {
  username: string;
  content: string;
  timestamp: Date;
}

function Comment({ postId }: Props) {
  const [data, setData] = useState<UserDataResponse>();
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

  const handleSubmit = (
    e:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | React.FormEvent<HTMLFormElement>
  ) => {
    document.getElementById('comment')!.textContent = '';
    e.preventDefault();
    setComment('');
    let formData = new FormData();
    formData.append('userID', data!._id);
    formData.append('postID', postId.toString());
    formData.append('ownerName', data!.firstName + ' ' + data!.lastName);
    formData.append('linkAvatar', data!.profilePhotoUrl);
    formData.append('content', comment);

    userService
      .postComment(formData)
      .then(() => {
        dispatch(setMessage('Success!!.', 'success'));
        dispatch(loadComments(!state));
      })
      .catch((err: any) => {
        console.log('Err: ', err.message);
        dispatch(setMessage('Sorry, Failed.', 'error'));
      });
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
        allCommentOfPhoto.map((cmt) => {
          return (
            <Status>
              {/* <AvatarWrapper>
                <img src={cmt.} alt="avatar" />
              </AvatarWrapper> */}
              <Wrapper>
                <UserName>{cmt.username}</UserName>
                <Comments>{cmt.content}</Comments>
              </Wrapper>
            </Status>
          );
        })}
    </Container>
  );
}

export default Comment;
