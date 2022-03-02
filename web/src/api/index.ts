import axios from 'axios';

export interface PixabayPhoto {
  webformatURL: string;
  downloads: number;
  likes: number;
  tags: string;
  user: string;
  views: string;
}

const { create } = axios;
const PIXABAY_API_URL = 'https://pixabay.com/api/';
const PIXABAY_API_KEY = '21224893-c61153f1d9b5a52314e204800';
const axiosInstance = create({
  method: 'GET',
  baseURL: PIXABAY_API_URL,
  headers: {
    'X-RateLimit-Limit': 100,
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
});

const getPhotoList = async (requestString: string) => {
  try {
    const rawData = await axiosInstance.get(PIXABAY_API_URL, {
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
    console.error(error.message);
  } finally {
    throw new Error(`Can't find any result for your keyword`);
  }
};

const getNewPhotoList = async () => {
  let inputStringList = ['girl', 'landscape', 'dog'];
  try {
    for (let requestString in inputStringList) {
      const rawData = await axiosInstance.get(PIXABAY_API_URL, {
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
  } catch (error: any) {
    console.error(error.message);
  } finally {
    throw new Error(`Can't find any result for your keyword`);
  }
};
const ApiServices = { getNewPhotoList, getPhotoList };
export default ApiServices;
