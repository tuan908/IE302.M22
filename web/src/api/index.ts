import axios from 'axios';

export interface PixabayPhoto {
  webformatURL: string;
  downloads: number;
  likes: number;
  tags: string;
  user: string;
  views: string;
}
const { get } = axios;

const PIXABAY_API_URL = 'https://pixabay.com/api/';
const PIXABAY_API_KEY = '21224893-c61153f1d9b5a52314e204800';

const getPhotoList = async (requestString: string) => {
  try {
    const rawData = await get(PIXABAY_API_URL, {
      params: {
        key: PIXABAY_API_KEY,
        q: requestString,
        per_page: 50,
      },
    });

    const data: PixabayPhoto[] = rawData.data.hits!.map(
      ({ ...rest }: PixabayPhoto) => ({
        ...rest,
      })
    );
    return data;
  } catch (error: any) {
    throw new Error(`Can't find any result for your keyword`);
  } finally {
  }
};

async function getNewPhotoList() {
  let inputStringList = ['girl', 'landscape', 'dog'];
  let data: PixabayPhoto[] = [];
  for (let requestString in inputStringList) {
    const rawData = await get(PIXABAY_API_URL, {
      params: {
        key: PIXABAY_API_KEY,
        q: requestString,
        per_page: 50,
      },
    });

    const data: PixabayPhoto[] | undefined = rawData.data.hits!.map(
      ({ ...rest }: PixabayPhoto) => ({
        ...rest,
      })
    );
    return data;
  }
  return data;
}
const ApiServices = { getNewPhotoList, getPhotoList };
export default ApiServices;
