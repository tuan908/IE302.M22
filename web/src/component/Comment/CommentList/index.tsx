import { Edit } from '@mui/icons-material';
import { Avatar } from '@mui/material';
import { Fragment, useReducer, useEffect, useCallback } from 'react';
import { PinterestComment } from '..';
import { AvatarWrapper, Status, Wrapper } from '../Component';
import { avatarStyle, ContentWrapper } from './ElementCss';
import fileService from 'src/service/file.service';

interface Props {
  postId: string;
}

export enum ACTIONS {
  UPDATE_ITEM = 'UPDATE_ITEM',
  HIDE_ITEM = 'HIDE_ITEM',
  CANCEL_EDIT = 'CANCEL_EDIT',
  GET_ITEM = 'GET_ITEM',
  SET_ITEM = 'SET_ITEM',
}

const initState = {
  tempItem: '',
  list: [],
};

const reducer = (state: any, action: any) => {
  console.log(action);
  switch (action.type) {
    case ACTIONS.UPDATE_ITEM: {
      const newList = state.list.map((item: PinterestComment) => {
        console.log(action);
        const isEqual = item.commentId === action.payload;

        if (isEqual) {
          const updatedItem: PinterestComment = {
            ...item,
            content: state.tempItem,
            isEditing: false,
          };
          return updatedItem;
        }
        return item;
      });
      return { ...state, list: newList };
    }

    case ACTIONS.HIDE_ITEM: {
      const newList = state.list.map((item: PinterestComment) => {
        if (item.commentId === action.commentId) {
          return {
            ...item,
            isEditing: true,
          };
        }
        return item;
      });
      return { ...state, list: newList };
    }

    case ACTIONS.CANCEL_EDIT: {
      const newList = state.list.map((item: PinterestComment) => {
        console.log(action);
        const isEqual = item.commentId === action.commentId;
        if (isEqual) {
          const newItem = {
            ...item,
            isEditing: false,
          };
          return newItem;
        } else {
          return item;
        }
      });
      return { ...state, list: newList };
    }

    case ACTIONS.GET_ITEM: {
      return {
        ...state,
        list: action.list,
      };
    }

    case ACTIONS.SET_ITEM: {
      return {
        ...state,
        data: action.payload,
      };
    }

    default:
      return state;
  }
};

export default function CommentList({ postId }: Props) {
  const [state, dispatch] = useReducer(reducer, initState);
  const { tempItem, list } = state;
  const handleCancel = useCallback((commentId: string) => {
    dispatch({
      type: ACTIONS.CANCEL_EDIT,
      commentId,
    });
  }, []);

  async function getAllCommentByImgId(postId: string) {
    try {
      const raw = await fileService.getAllCommentById(postId);
      dispatch({ type: ACTIONS.GET_ITEM, list: raw.data });
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    getAllCommentByImgId(postId.toString());
  }, []);

  function handleStartEdit(commentIndex: string) {
    dispatch({ type: ACTIONS.HIDE_ITEM, commentId: commentIndex });
  }

  function handleEdit(data: string, commentId: string) {
    dispatch({
      type: ACTIONS.SET_ITEM,
      payload: {
        data,
        commentId,
      },
    });
  }

  function handleSubmit(commentId: string) {
    dispatch({ type: ACTIONS.UPDATE_ITEM, payload: commentId });
  }

  return (
    <Fragment>
      {list.map((item: PinterestComment, index: number) => (
        <Status key={index}>
          <AvatarWrapper>
            <Avatar style={avatarStyle} />
          </AvatarWrapper>

          <Wrapper>
            <ContentWrapper style={{ display: item.isEditing ? 'none' : '' }}>
              <span>{item.content}</span>
              <Edit onClick={() => handleStartEdit(item.commentId!)} />
            </ContentWrapper>

            <div style={{ display: item.isEditing ? '' : 'none' }}>
              <form action="">
                <input
                  type="text"
                  value={tempItem}
                  onChange={(e) => handleEdit(e.target.value, item.commentId!)}
                />
              </form>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}
              >
                <button
                  className="execute__edit"
                  onClick={() => handleSubmit(item.commentId!)}
                >
                  Edit
                </button>
                <button onClick={() => handleCancel(item.commentId!)}>
                  Cancel
                </button>
              </div>
            </div>
          </Wrapper>
        </Status>
      ))}
    </Fragment>
  );
}
