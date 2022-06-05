import axios from 'axios';

interface PixabayPhoto {
  downloads: number;
  id: number;
  likes: number;
  tags: string;
  views: string;
  webformatURL: string;
  user: string;
  type: string;
}
const { get } = axios;

const pixabayApiUrl = process.env.REACT_APP_PIXABAY_API_URL;
const pixabayApiKey = process.env.REACT_APP_PIXABAY_API_KEY;

const getPhotoListByKeyword = async (keyword: string) => {
  try {
    const rawData = await get(pixabayApiUrl!, {
      params: {
        key: pixabayApiKey,
        q: keyword,
        per_page: 200,
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

async function getStartPhotoList() {
  let inputStringList = ['girl', 'landscape', 'dog', 'anime'];
  let data: PixabayPhoto[] = [];
  for (let requestString in inputStringList) {
    const rawData = await get(pixabayApiUrl!, {
      params: {
        key: pixabayApiKey,
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

export { PixabayPhoto, getPhotoListByKeyword, getStartPhotoList };
