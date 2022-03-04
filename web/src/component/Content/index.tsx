import { Grid } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import ApiServices, { PixabayPhoto } from 'src/api';

interface PinterestContentProps {}

const PinterestContent: FC<PinterestContentProps> = () => {
  const [items, setItems] = useState<PixabayPhoto[] | undefined>();
  const { getPhotoList } = ApiServices;
  const getData = async () => {
    const data = await getPhotoList('sexy girl');
    try {
      setItems(data);
    } catch (error: any) {
      throw new Error(error.message);
    }
    return data;
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {items!?.map(
        ({ downloads, likes, tags, user, views, webformatURL }, index) => (
          <Grid key={index}>
            <img src={webformatURL} alt="" />
          </Grid>
        )
      )}
    </div>
  );
};

export default PinterestContent;
