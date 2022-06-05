import { Edit } from '@mui/icons-material';
import { Avatar, Button, Grid, TextField } from '@mui/material';
import { Fragment, useEffect, useReducer } from 'react';
import { Wrapper } from 'src/component/Header/Component';
import { holdComment } from 'src/redux/action/comment';
import { usePinterestDispatch, usePinterestSelector } from 'src/redux/hooks';
import fileService from 'src/service/file.service';
import { PinterestComment } from '..';
import { AvatarWrapper } from '../Component';
import { ACTIONS } from './componentConstant';
import reducer from './componentReducer';
import { avatarStyle } from './ElementCss';

const initState: { list: PinterestComment[] } = {
  list: [],
};

interface Props {
  postId: number;
}

export default function CommentList({ postId }: Props) {
  const [state, componentDispatch] = useReducer(reducer, initState);
  const comment = usePinterestSelector((state) => state.commentReducer.comment);
  const appDispatch = usePinterestDispatch();

  async function getAllCommentByImgId(postId: string) {
    try {
      const raw = await fileService.getAllCommentById(postId);
      const fetchDataAction = {
        type: ACTIONS.FETCH_LIST,
        payload: raw.data,
      };
      componentDispatch(fetchDataAction);
    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getAllCommentByImgId(postId.toString());
  }, []);

  function onStartEdit({ commentId, content }: PinterestComment) {
    componentDispatch({
      payload: { id: commentId },
      type: ACTIONS.START_EDIT,
    });
    appDispatch(holdComment(content));
  }

  function onEdit(inputValue: string) {
    const holdCommentAction = holdComment(inputValue);
    appDispatch(holdCommentAction);
  }

  function onCancelEdit({ commentId }: PinterestComment) {
    componentDispatch({
      type: ACTIONS.CANCEL_EDIT,
      payload: {
        commentId: commentId,
      },
    });
  }

  function onDoneEdit(id: string) {
    componentDispatch({
      type: ACTIONS.EDIT,
      payload: {
        commentId: id,
        content: comment,
      },
    });

    appDispatch(holdComment(''));
  }

  return (
    <Fragment>
      {state.list.map((item: PinterestComment, index: number) => (
        <Grid
          key={index}
          sx={{
            width: '100%',

            display: 'flex',
            flexDirection: 'row',
            alignContent: 'flex-start',

            marginTop: 1.25,
          }}
        >
          <AvatarWrapper>
            <Avatar style={avatarStyle} />
          </AvatarWrapper>

          <Wrapper>
            <Grid
              style={{ display: item.isEditing ? 'none' : '' }}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',

                '&:hover': {
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                },
              }}
            >
              <span>{item.content}</span>
              <Edit onClick={() => onStartEdit(item)} className="edit__btn" />
            </Grid>

            <div style={{ display: item.isEditing ? '' : 'none' }}>
              <TextField
                value={comment}
                type="text"
                onChange={(e) => onEdit(e.target.value)}
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
        </Grid>
      ))}
    </Fragment>
  );
}
