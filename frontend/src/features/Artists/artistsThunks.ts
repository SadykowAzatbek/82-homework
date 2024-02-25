import {createAsyncThunk} from '@reduxjs/toolkit';
import {ArtistsTypes} from '../../types';
import axiosApi from '../../axiosApi.ts';

export const getArtists = createAsyncThunk<ArtistsTypes[]>(
  'artists/get',
  async () => {
    const response = await axiosApi.get<ArtistsTypes[]>('/artists');
    const items = response.data;

    if (!items) {
      return [];
    }

    return items;
  },
);