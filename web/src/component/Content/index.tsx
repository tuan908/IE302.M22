import { FC, useEffect } from 'react';
// import type { PixabayPhoto } from 'src/api';
import ApiServices from 'src/api';
interface PinterestContentProps {}

const PinterestContent: FC<PinterestContentProps> = () => {
  // const [items, setItems] = useState<PixabayPhoto[] | []>();
  const { getNewPhotoList } = ApiServices;
  const getData = async () => {
    // const raw = await fetch(
    //   'https://pixabay.com/api/?key=21224893-c61153f1d9b5a52314e204800&q=Code&per_page=100'
    // );
    // const data = await raw.json();
    const data = await getNewPhotoList();
    try {
      // setItems(raw);
      console.log(data);
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
      {/* {items!.map(
        ({ downloads, likes, tags, user, views, webformatURL }, index) => (
          <div key={index}>{downloads}</div>
        )
      )} */}
    </div>
  );
};

export default PinterestContent;
