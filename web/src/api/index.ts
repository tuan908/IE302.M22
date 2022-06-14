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
  userImageURL: string;
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
      (item: PixabayPhoto) => item
    );
    return data;
  } catch (error: any) {
    throw new Error(`Can't find any result for your keyword`);
  } finally {
  }
};

async function getStartPhotoList() {
  let inputStringList = ['dog', 'universe', 'art', 'travel', 'vietnam'];

  let pinterestData: PixabayPhoto[] = [];

  for (let index = 0; index < inputStringList.length; index++) {
    const rawData = await get(pixabayApiUrl!, {
      params: {
        key: pixabayApiKey,
        q: inputStringList[index],
        per_page: 150,
        page: 1,
      },
    });

    const data: PixabayPhoto[] = rawData.data.hits.map((item: PixabayPhoto) => {
      return {
        ...item,
      };
    });

    pinterestData = [...pinterestData, ...data];
  }

  return pinterestData;
}

export { PixabayPhoto, getPhotoListByKeyword, getStartPhotoList };
