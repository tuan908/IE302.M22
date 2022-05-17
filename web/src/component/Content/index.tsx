import { useEffect, useState } from 'react';
import ApiServices, { PixabayPhoto } from 'src/api';
import Pin from '../Pin';

const PinterestContent = () => {
  const [items, setItems] = useState<PixabayPhoto[]>([]);
  const { getNewPhotoList } = ApiServices;
  const getData = async () => {
    const data = await getNewPhotoList();
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
