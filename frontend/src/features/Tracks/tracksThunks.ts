import {createAsyncThunk} from '@reduxjs/toolkit';
import {TracksTypes} from '../../types';
import axiosApi from '../../axiosApi.ts';

export const getTracks = createAsyncThunk<TracksTypes[], string>(
  'tracks/get',
  async (id) => {
    const response = await axiosApi.get<TracksTypes[]>(`/tracks?album=${id}`);
    const items = response.data;

    if (!items) {
      return [];
    }

    return items;
  },
);