import { Edit } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useEffect, useState } from 'react';
import { PinterestComment } from '../Comment';
import { AvatarWrapper, Status } from '../Comment/CommentComponents';
import EditComment from '../EditComment';
import { Wrapper } from '../Header/HeaderComponents';
import { avatarStyle, avatarSx, ContentWrapper, isDisplay } from './ElementCss';

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
    const newComments = [...comments];
    newComments[id!].content = value;
    newComments[id!].isEdited = true;
    setComments(newComments);
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
              />
            </ContentWrapper>

            <EditComment
              item={item}
              handleEdit={handleEditComment}
              setShow={setShow}
              index={index}
            />
          </Wrapper>
        </Status>
      ))}
    </>
  );
}
