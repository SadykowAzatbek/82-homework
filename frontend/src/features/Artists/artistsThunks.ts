import {createAsyncThunk} from '@reduxjs/toolkit';
import {ArtistsTypes, ArtistWithoutId} from '../../types';
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

export const addArtists = createAsyncThunk<void, ArtistWithoutId>(
  'add/artists',
  async (data) => {
    try {
      const formData = new FormData();

      formData.append('name', data.name);
      formData.append('info', data.info);
      formData.append('isPublished', String(data.isPublished));

      if (data.image) {
        formData.append('image', data.image);
      }

      await axiosApi.post<ArtistWithoutId>('/artists', formData);
    } catch (err) {
      throw err;
    }
  },
);