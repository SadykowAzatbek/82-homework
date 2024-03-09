import {createAsyncThunk} from '@reduxjs/toolkit';
import {AlbumsTypes, AlbumWithoutId} from '../../types';
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

export const getAllAlbums = createAsyncThunk<AlbumsTypes[]>(
  'albums/get',
  async () => {
    const response = await axiosApi.get<AlbumsTypes[]>('/albums');
    const albums = response.data;

    if (!albums) {
      return [];
    }

    return albums;
  },
);

export const addAlbum = createAsyncThunk<void, AlbumWithoutId>(
  'add/albums',
  async (data) => {
    try {
      const formData = new FormData();

      formData.append('artist', data.artist);
      formData.append('name', data.name);
      formData.append('release', data.release);

      if (data.image) {
        formData.append('image', data.image);
      }

      await axiosApi.post('/albums', formData);
    } catch (err) {
      throw err;
    }
  }
);