import { Dispatch, SetStateAction } from 'react';
import { PinterestComment } from '../Comment';
import { EditCommentWrapper } from './Component';

interface Props {
  item: PinterestComment;
  handleEdit: (value: string, commentId: string) => void;
  setShow: Dispatch<SetStateAction<boolean>>;
  index: number;
}

export default function EditComment({ item, handleEdit, index }: Props) {
  return (
    <EditCommentWrapper style={{ display: 'none' }} className="edt-cmt">
      <input
        type="text"
        value={item.content}
        onChange={(e) => handleEdit(e.target.value, index.toString())}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}
      >
        <button>Edit</button>
        <button>Cancel</button>
      </div>
    </EditCommentWrapper>
  );
}
