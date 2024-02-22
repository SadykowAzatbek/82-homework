import {AlbumsTypes, ArtistsTypes, TracksTypes} from '../../types';
import {createAsyncThunk} from '@reduxjs/toolkit';
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