import { useState } from 'react';
import { PinterestComment } from '..';
import { EditCommentWrapper } from './Component';

interface Props {
  item: PinterestComment;
  index: number;
  handleEdit: (id?: string) => void;
}

export default function EditComment({ item, handleEdit }: Props) {
  const defaultContent = item.content;
  const [content, setContent] = useState(defaultContent);

  return (
    <EditCommentWrapper style={{ display: item.isEditing ? '' : 'none' }}>
      <input
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
        }}
      >
        <button className="execute__edit">Edit</button>
        <button>Cancel</button>
      </div>
    </EditCommentWrapper>
  );
}
