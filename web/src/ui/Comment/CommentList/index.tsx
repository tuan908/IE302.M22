import { Edit } from '@mui/icons-material';
import { Avatar, Button, Grid, TextField } from '@mui/material';
import { Fragment } from 'react';
import { holdComment } from 'src/redux/action/comment';
import { usePinterestDispatch, usePinterestSelector } from 'src/redux/hooks';
import { Wrapper } from 'src/ui/Header/Component';
import { PinterestComment } from '..';
import { AvatarWrapper, Status } from '../Component';
import { ACTIONS } from './componentConstant';
import { avatarStyle } from './ElementCss';

interface Props {
  comments: [];
}

export default function CommentList({ comments }: Props) {
  const comment = usePinterestSelector((state) => state.commentReducer.comment);
  const appDispatch = usePinterestDispatch();

  function onStartEdit({ commentId, content }: PinterestComment) {
    appDispatch({
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
    appDispatch({
      type: ACTIONS.CANCEL_EDIT,
      payload: {
        commentId: commentId,
      },
    });
  }

  function onDoneEdit(id: string) {
    appDispatch({
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
      {comments.map((item: PinterestComment, index: number) => (
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
        </Status>
      ))}
    </Fragment>
  );
}
