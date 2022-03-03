import { FC, useEffect, useState } from 'react';
// import type { PixabayPhoto } from 'src/api';
import ApiServices, { PixabayPhoto } from 'src/api';
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
    } finally {
      return data;
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {items!.map(
        ({ downloads, likes, tags, user, views, webformatURL }, index) => (
          <div key={index}>{downloads}</div>
        )
      )}
    </div>
  );
};

export default PinterestContent;
