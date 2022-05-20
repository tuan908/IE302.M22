import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { PixabayPhoto } from 'src/api';

const baseUrl = `https://pixabay.com/api?key=${process.env.REACT_APP_PIXABAY_API_KEY}`;

export const pixabayApi = createApi({
  reducerPath: 'pixabayApi',
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (builder) => ({
    getImageByKeyword: builder.query<PixabayPhoto, string>({
      query: (keyword) => `?q=${keyword}`,
    }),
  }),
});

export const { useGetImageByKeywordQuery } = pixabayApi;
