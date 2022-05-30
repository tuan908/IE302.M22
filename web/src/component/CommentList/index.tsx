import { Edit } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import { Fragment, useEffect, useReducer, useRef, useState } from 'react';
import { PinterestComment } from '../Comment';
import { AvatarWrapper, Status } from '../Comment/CommentComponents';
import EditComment from '../EditComment';
import { Wrapper } from '../Header/HeaderComponents';
import { avatarStyle, ContentWrapper } from './ElementCss';

interface Props {
  list: PinterestComment[];
}

function commentListReducer(state: any, action: any) {
  console.log(state);
  switch (action.type) {
    case 'UPDATE_ITEM': {
      const newList = state.list.map((item: any) => {
        if (item.commentId === action.commentId) {
          const updatedItem = { ...item, content: action.content };
          return updatedItem;
        }
        return item;
      });
      return { ...state, list: newList };
    }
    default:
      return state;
  }
}

export default function CommentList({ list }: Props) {
  const [comments, setComments] = useState<PinterestComment[]>(list ?? []);
  const contentRef = useRef<HTMLDivElement>(null);
  const [, dispatch] = useReducer(commentListReducer, {
    list,
  });
  if (contentRef.current) {
    console.log(contentRef.current);
  }

  function handleEdit(id: string) {
    dispatch({ type: 'UPDATE_ITEM', id });
  }

  useEffect(() => {
    setComments(list);
  }, [list]);

  return (
    <Fragment>
      {comments.map((item, index) => (
        <Status key={index}>
          <AvatarWrapper>
            <Avatar style={avatarStyle} />
          </AvatarWrapper>

          <Wrapper>
            <ContentWrapper ref={contentRef}>
              <span>{item.content}</span>
              <Edit onClick={() => handleEdit(item.commentId!)} />
            </ContentWrapper>

            <EditComment item={item} index={index} handleEdit={handleEdit} />
          </Wrapper>
        </Status>
      ))}
    </Fragment>
  );
}
