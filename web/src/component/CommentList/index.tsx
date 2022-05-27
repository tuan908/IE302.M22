import { Avatar } from '@mui/material';
import { useEffect, useState } from 'react';
import { PinterestComment } from '../Comment';
import { AvatarWrapper, Status } from '../Comment/CommentComponents';
import EditComment from '../EditComment';
import { Wrapper } from '../Header/HeaderComponents';
import { avatarStyle, avatarSx, ContentWrapper, isDisplay } from './ElementCss';

import IconButton from '@mui/material/IconButton';
import { Edit } from '@mui/icons-material';

interface Props {
  list: PinterestComment[];
}

export default function CommentList({ list }: Props) {
  const [isShow, setShow] = useState(false);
  const [comments, setComments] = useState<PinterestComment[]>(list ?? []);

  useEffect(() => {
    setComments(list);
  }, [list]);

  function handleEditComment(value: string, id?: string) {
    const newComments = comments.map((comment) => {
      if (comment.commentId === id) {
        setShow(true);
        comment.content = value;
      }
      return comment;
    });

    setComments(newComments);
  }

  function enableEdit(cmtIdx: String) {
    console.log(cmtIdx);
  }

  return (
    <>
      {comments.map((item, index) => (
        <Status key={index}>
          <AvatarWrapper>
            <Avatar style={avatarStyle} sx={avatarSx} />
          </AvatarWrapper>

          <Wrapper>
            <ContentWrapper>
              <span style={isDisplay(!isShow)}>{item.content}</span>
              <IconButton
                children={<Edit />}
                sx={{ marginLeft: '1rem', ...isDisplay(!isShow) }}
                onClick={() => enableEdit(index.toString())}
              />
            </ContentWrapper>

            <EditComment
              isShow={isShow}
              item={item}
              handleEdit={handleEditComment}
              setShow={setShow}
              index={index.toString()}
            />
          </Wrapper>
        </Status>
      ))}
    </>
  );
}
