import { ImageList, ImageListItem, ImageListItemBar } from '@mui/material';
import { PinterestImage } from '..';

interface Props {
  listPostId: PinterestImage[];
}
const Posted = ({ listPostId }: Props) => {
  const data: PinterestImage[] = listPostId ?? [];

  return (
    <>
      <ImageList
        style={{ width: '80%', height: '100%', minHeight: '100vh' }}
        children={
          <>
            {data.map((item, index) => (
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
                      Original author:
                      {item.author ? item.author : item.username}
                    </span>
                  }
                  position="below"
                />
              </ImageListItem>
            ))}
          </>
        }
      />
    </>
  );
};

export default Posted;
