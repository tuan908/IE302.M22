import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Typography,
} from '@mui/material';
import { PinterestImage } from '..';

interface Props {
  listPostId: PinterestImage[];
}
const Posted = ({ listPostId }: Props) => {
  if (!listPostId) {
    return <Typography variant="h5">You don't have any post!</Typography>;
  } else {
    return (
      <>
        <ImageList sx={{ width: 500, height: 450 }}>
          {listPostId.map((item, index) => (
            <ImageListItem key={index}>
              <img
                src={
                  item.base64ImageString
                    ? item.base64ImageString
                    : item.imgUrlFromSave
                }
                alt={item.content}
                loading="lazy"
              />
              <ImageListItemBar
                title={item.content}
                subtitle={
                  <span>
                    by:
                    {item.author ? item.author : item.username}
                  </span>
                }
                position="below"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </>
    );
  }
};

export default Posted;
