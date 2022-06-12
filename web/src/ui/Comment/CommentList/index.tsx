import { Edit } from '@mui/icons-material';
import { Avatar, Box, Button, Grid, Typography } from '@mui/material';
import { Fragment, useReducer } from 'react';
import { CssTextField } from 'src/page/Login/Component';
import { holdComment } from 'src/redux/action/comment';
import { usePinterestDispatch, usePinterestSelector } from 'src/redux/hooks';
import FileServices from 'src/service/file.service';
import { Wrapper } from 'src/ui/Header/Component';
import { PinterestComment } from '..';
import { AvatarWrapper, Status } from '../Component';
import { ACTIONS } from './componentConstant';
import reducer from './componentReducer';
import { avatarStyle } from './ElementCss';

interface Props {
  comments: PinterestComment[];
}

export default function CommentList({ comments }: Props) {
  const comment = usePinterestSelector((state) => state.commentReducer.comment);
  const appDispatch = usePinterestDispatch();
  const [state, dispatch] = useReducer(reducer, {
    list: comments ?? [],
  });

  function onStartEdit({ commentId, content }: PinterestComment) {
    dispatch({
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
    dispatch({
      type: ACTIONS.CANCEL_EDIT,
      payload: {
        commentId: commentId,
      },
    });
  }

  async function onDoneEdit(id: string) {
    await FileServices.updateCommentById({
      commentId: id,
      contentToUpdate: comment,
    });

    dispatch({
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
        <Status key={index}>
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
              }}
            >
              <Box sx={{ display: '-webkit-flex', flexDirection: 'column' }}>
                <Typography>{item.username}</Typography>
                <span>{item.content}</span>
              </Box>
              <Edit onClick={() => onStartEdit(item)} className="edit__btn" />
            </Grid>

            <div style={{ display: item.isEditing ? '' : 'none' }}>
              <CssTextField
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
        </Status>
      ))}
    </Fragment>
  );
}
