import { Cancel, CheckRounded } from '@mui/icons-material';
import { Avatar, Button } from '@mui/material';
import { useState, useEffect } from 'react';
import { PinterestComment } from '../Comment';
import { AvatarWrapper, Status } from '../Comment/CommentComponents';
import { Wrapper } from '../Header/HeaderComponents';
import { avatarStyle, avatarSx, inputStyle, isDisplay } from './ElementCss';

interface Props {
  list: PinterestComment[];
}

export default function CommentList({ list }: Props) {
  const [isShow, setShow] = useState(false);
  const [comments, setComments] = useState<PinterestComment[]>(list ?? []);
  const [comment, setComment] = useState<PinterestComment>();

  useEffect(() => {
    setComments(list);
  }, [list]);

  function handleEdit(value: string, id?: string) {
    const newComments = comments.map((comment) => {
      if (comment.commentId === id) {
        comment.content = value;
      }
      return comment;
    });

    setComments(newComments);
  }

  function setContent(item: PinterestComment) {
    setComment({
      ...item,
    });
  }

  return (
    <>
      {comments.map((item) => (
        <Status key={item.commentId}>
          <AvatarWrapper>
            <Avatar style={avatarStyle} sx={avatarSx} />
          </AvatarWrapper>

          <Wrapper>
            <input
              type="text"
              value={comment!?.content}
              onChange={(e) => handleEdit(e.target.value, comment!?.commentId)}
              style={inputStyle(isShow)}
            />
            <CheckRounded
              style={{
                display: isShow ? '' : 'none',
                color: isShow ? 'blue' : '',
              }}
              onClick={() => {
                setShow(!isShow);
              }}
            />
            <Cancel
              onClick={() => setShow(!isShow)}
              style={isDisplay(isShow)}
            />

            <h4 style={isDisplay(!isShow)}>{item.content}</h4>
            <Button
              onClick={() => {
                setShow(!isShow);
              }}
              style={isDisplay(!isShow)}
            >
              Edit
            </Button>
          </Wrapper>
        </Status>
      ))}
    </>
  );
}
