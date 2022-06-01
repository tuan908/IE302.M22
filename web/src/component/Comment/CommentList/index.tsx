import { Edit } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import { Fragment, useReducer } from 'react';
import { PinterestComment } from '..';
import { Wrapper } from '../../Header/HeaderComponents';
import { AvatarWrapper, Status } from '../Component';
import EditComment from '../EditComment';
import { avatarStyle, ContentWrapper } from './ElementCss';

interface Props {
  list: PinterestComment[];
}

enum ACTIONS {
  UPDATE_ITEM = 'UPDATE_ITEM',
  TOGGLE_ITEM = 'TOGGLE_ITEM',
}

const reducer = (state: any, action: any) => {
  console.log(action);
  console.log(state);
  switch (action.type) {
    case ACTIONS.UPDATE_ITEM: {
      const newList = state.list.map((item: PinterestComment) => {
        if (item.commentId === action.commentId) {
          const updatedItem: PinterestComment = {
            ...item,
            content: action.content,
            isEditing: true,
          };
          console.log(updatedItem);
          return updatedItem;
        }
        return item;
      });
      return { ...state, list: newList };
    }

    case ACTIONS.TOGGLE_ITEM: {
      const newList = state.list.map((item: PinterestComment) => {
        if (item.commentId === action.id) {
          return {
            ...item,
            isEditing: true,
          };
        }
        return item;
      });
      return { ...state, list: newList };
    }

    default:
      return state;
  }
};

export default function CommentList({ list }: Props) {
  const initState = list.length > 0 ? list.map((item) => item) : [];
  const [state, dispatch] = useReducer(reducer, { list: initState });

  function handleEdit(commentIndex: string) {
    dispatch({ type: ACTIONS.TOGGLE_ITEM, commentIndex });
    dispatch({ type: ACTIONS.UPDATE_ITEM, commentIndex });
  }

  return (
    <Fragment>
      {state.list.map((item: PinterestComment, index: number) => (
        <Status key={index}>
          <AvatarWrapper>
            <Avatar style={avatarStyle} />
          </AvatarWrapper>

          <Wrapper>
            <ContentWrapper style={{ display: item.isEditing ? 'none' : '' }}>
              <span>{item.content}</span>
              <Edit onClick={() => handleEdit(item.commentId!)} />
            </ContentWrapper>

            <EditComment
              key={index}
              item={item}
              index={index}
              handleEdit={handleEdit}
            />
          </Wrapper>
        </Status>
      ))}
    </Fragment>
  );
}
