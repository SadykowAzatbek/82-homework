import {createAsyncThunk} from '@reduxjs/toolkit';
import {AlbumsTypes} from '../../types';
import axiosApi from '../../axiosApi.ts';

export const getAlbums = createAsyncThunk<AlbumsTypes[], string>(
  'albums/get',
  async (id) => {
    const response = await axiosApi.get<AlbumsTypes[]>(`/albums?artist=${id}`);
    const items = response.data;

    if (!items) {
      return [];
    }

    return items;
  },
);