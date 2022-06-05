import { useEffect, useState } from 'react';
import { getStartPhotoList, PixabayPhoto } from 'src/api';
import Pin from '../Pin';

const PinterestContent = () => {
  const [items, setItems] = useState<PixabayPhoto[]>([]);
  const getData = async () => {
    const data = await getStartPhotoList();
    try {
      setItems(data!);
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
      {items!?.map(({ ...rest }, index) => (
        <Pin {...rest} key={index} />
      ))}
    </>
  );
};

export default PinterestContent;
