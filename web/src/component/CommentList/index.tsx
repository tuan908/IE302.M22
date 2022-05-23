import { CheckRounded } from '@mui/icons-material';
import { Avatar } from '@mui/material';
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
  const [content, setContent] = useState<string>('');

  function handleEdit(idx: number) {
    setShow(!isShow);
  }
  return (
    <>
      {list.map((item, index) => (
        <Status key={index}>
          <AvatarWrapper>
            <Avatar style={avatarStyle} sx={avatarSx} />
          </AvatarWrapper>

          <Wrapper>
            <input
              id="edit__comment"
              type="text"
              value={content}
              onChange={(e) => setContent(e.currentTarget?.textContent)}
              style={inputStyle(isShow)}
            />
            <CheckRounded
              style={{
                display: isShow ? '' : 'none',
                color: isShow ? 'blue' : '',
              }}
            />
            <p
              style={{ display: isShow ? 'none' : '' }}
              onClick={() => handleEdit(index)}
            >
              {item.content}
            </p>
          </Wrapper>
        </Status>
      ))}
    </>
  );
}
