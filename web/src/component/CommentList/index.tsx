import { CheckRounded } from '@mui/icons-material';
import { Avatar, Button } from '@mui/material';
import { useState } from 'react';
import { PinterestComment } from '../Comment';
import { AvatarWrapper, Status } from '../Comment/CommentComponents';
import { Wrapper } from '../Header/HeaderComponents';
import { avatarStyle, avatarSx, inputStyle } from './ElementCss';

interface Props {
  list: PinterestComment[];
}

export default function CommentList({ list }: Props) {
  const [isShow, setShow] = useState(false);
  const [comments, setComments] = useState<PinterestComment[]>(list);
  const [comment, setComment] = useState<PinterestComment>(
    {} as PinterestComment
  );
  console.log(comments);
  function handleEdit(idx: number) {
    setComments((prev) => [...prev, comment]);
  }

  return (
    <>
      {comments.map((item, index) => (
        <Status key={index}>
          <AvatarWrapper>
            <Avatar style={avatarStyle} sx={avatarSx} />
          </AvatarWrapper>

          <Wrapper onClick={() => handleEdit(index)}>
            <input
              id="edit__comment"
              type="text"
              value={comment.content}
              onChange={(e) =>
                setComment({
                  ...item,
                  [item.content]: e.currentTarget.textContent,
                })
              }
              style={inputStyle(isShow)}
            />
            <CheckRounded
              style={{
                display: isShow ? '' : 'none',
                color: isShow ? 'blue' : '',
              }}
              onClick={() => setShow(!isShow)}
            />
            <h4 style={{ display: !isShow ? '' : 'none' }}>{item.content}</h4>
            <Button
              onClick={() => setShow(!isShow)}
              style={{ display: !isShow ? '' : 'none' }}
            >
              Edit
            </Button>
          </Wrapper>
        </Status>
      ))}
    </>
  );
}
