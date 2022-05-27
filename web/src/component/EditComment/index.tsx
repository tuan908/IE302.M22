import { Dispatch, SetStateAction } from 'react';
import { PinterestComment } from '../Comment';
import { btnCss, inputStyle } from '../CommentList/ElementCss';
import { EditCommentWrapper } from './Component';

interface Props {
  isShow: boolean;
  item: PinterestComment;
  handleEdit: (value: string, commentId: string) => void;
  setShow: Dispatch<SetStateAction<boolean>>;
  index: string;
}

type Ref = React.RefObject<HTMLDivElement>;

export default function EditComment({
  isShow,
  item,
  handleEdit,
  setShow,
  index,
}: Props) {
  const setContent = (item: PinterestComment) => item.content;

  let editCommentRef: Ref;

  console.log(editCommentRef!?.current?.click());
  return (
    <EditCommentWrapper ref={editCommentRef!}>
      <input
        type="text"
        value={setContent(item)}
        onChange={(e) => handleEdit(e.target.value, item!?.commentId!)}
        style={inputStyle(isShow)}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}
      >
        <button onClick={() => setShow(isShow)} style={btnCss(isShow)}>
          Edit
        </button>
        <button
          onClick={() => {
            setShow(!isShow);
          }}
          style={btnCss(isShow)}
        >
          Cancel
        </button>
      </div>
    </EditCommentWrapper>
  );
}
