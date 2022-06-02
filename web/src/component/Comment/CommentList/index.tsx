import { Edit } from '@mui/icons-material';
import { Avatar, Button } from '@mui/material';
import { Fragment, useEffect, useReducer } from 'react';
import { holdComment } from 'src/redux/action/comment';
import { usePinterestDispatch } from 'src/redux/hooks';
import fileService from 'src/service/file.service';
import { PinterestComment } from '..';
import { Wrapper } from '../../Header/HeaderComponents';
import { AvatarWrapper, Status } from '../Component';
import { ACTIONS } from './constants';
import { avatarStyle, ContentWrapper } from './ElementCss';
import { reducer } from './reducer';

const initState: { list: PinterestComment[] } = {
  list: [],
};

interface Props {
  postId: number;
}

export default function CommentList({ postId }: Props) {
  const [state, dispatch] = useReducer(reducer, initState);
  // const {comment} = usePinterestSelector((state) => state.commentReducer);

  const pinterestDispatch = usePinterestDispatch();

  async function getAllCommentByImgId(postId: string) {
    try {
      const raw = await fileService.getAllCommentById(postId);
      const fetchDataAction = {
        type: ACTIONS.FETCH_LIST,
        payload: raw.data,
      };
      dispatch(fetchDataAction);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getAllCommentByImgId(postId.toString());
  }, []);

  function onStartEdit(id: string) {
    dispatch({
      payload: { id },
      type: ACTIONS.START_EDIT,
    });
  }

  function onEdit(id: string, inputValue: string) {
    dispatch({
      type: ACTIONS.EDIT,
      payload: {
        commentId: id,
        data: inputValue,
      },
    });
  }

  function onCancelEdit({ commentId, content }: PinterestComment) {
    dispatch({
      type: ACTIONS.CANCEL_EDIT,
      payload: {
        commentId: commentId,
      },
    });

    const holdCommentAction = holdComment(content);
    pinterestDispatch(holdCommentAction);
  }

  function onDoneEdit(id: string) {
    dispatch({ type: ACTIONS.EDIT, payload: { id } });
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
              <Edit onClick={() => onStartEdit(item.commentId!)} />
            </ContentWrapper>

            <div style={{ display: item.isEditing ? '' : 'none' }}>
              <input
                type="text"
                onChange={(e) => onEdit(item.commentId!, e.target.value)}
              />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}
              >
                <Button onClick={() => onDoneEdit(item.commentId!)}>
                  Edit
                </Button>
                <Button onClick={() => onCancelEdit(item)}>Cancel</Button>
              </div>
            </div>
          </Wrapper>
        </Status>
      ))}
    </Fragment>
  );
}
