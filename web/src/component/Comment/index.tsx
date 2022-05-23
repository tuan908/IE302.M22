import FaceIcon from '@mui/icons-material/Face';
import Send from '@mui/icons-material/Send';
import { Avatar } from '@mui/material';
import React, { useEffect, useState } from 'react';
import loadComments from 'src/redux/action/comment';
import setMessage from 'src/redux/action/message';
import { usePinterestDispatch, usePinterestSelector } from 'src/redux/hooks';
import fileService from 'src/service/file.services';
import userService from 'src/service/user.services';
import {
  AddComment,
  AvatarWrapper,
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
  const [comments, setComments] = useState<PinterestComment[]>([]);
  const [isShow, setShow] = useState(false);
  const [content, setContent] = useState<string>('');
  const userCurrent = usePinterestSelector((state) => state.userReducer.user);
  //
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

  console.log(data);

  const handleSubmit = (
    e:
      | React.MouseEvent<SVGSVGElement, MouseEvent>
      | React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    console.log(comment);
    // console.log(allCommentOfPhoto);
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

  function handleClick(value: string) {
    setShow(!isShow);
    setContent(value);
  }

  function handleEdit(value: string) {
    setContent(value);
  }

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
        <Send
          style={{ borderRadius: '50%' }}
          onClick={(e) => {
            handleSubmit(e);
            resetInput();
          }}
        />
      </AddComment>

      {comments!?.map((cmt, index) => {
        return (
          <Status key={index}>
            <AvatarWrapper>
              {/* <img src={cmt.} alt="avatar" /> */}
            </AvatarWrapper>
            <Wrapper>
              <Avatar
                style={{ marginRight: '1rem' }}
                sx={{ width: '2em', height: '2em' }}
              />
              <input
                type="text"
                value={content}
                onChange={(e) => handleEdit(e.currentTarget.value)}
                style={{
                  display: isShow ? '' : 'none',
                  border: 'none',
                  outline: 'none',
                  padding: '5px 10px',
                }}
                id="edit__cmt"
              />
              <Comments
                onClick={() => handleClick(cmt.content)}
                style={{ display: isShow ? 'none' : '' }}
              >
                {cmt.content}
              </Comments>
            </Wrapper>
          </Status>
        );
      })}
    </Container>
  );
}

export default Comment;
