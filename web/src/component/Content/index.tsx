import { FC, useEffect, useState } from 'react';
import ApiServices, { PixabayPhoto } from 'src/api';
import Pin from '../Pin';

interface PinterestContentProps {}

const PinterestContent: FC<PinterestContentProps> = () => {
  const [items, setItems] = useState<PixabayPhoto[] | undefined>();
  const { getNewPhotoList } = ApiServices;
  const getData = async () => {
    const data = await getNewPhotoList();
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
    <>
      {items!?.map(
        ({ downloads, likes, tags, user, views, webformatURL }, index) => (
          // <img src={webformatURL} alt="" key={index} />
          <Pin
            webformatURL={webformatURL}
            key={index}
            tags={tags}
            views={views}
          />
        )
      )}
    </>
  );
};

export default PinterestContent;
