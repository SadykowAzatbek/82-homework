import {createAsyncThunk} from '@reduxjs/toolkit';
import {AlbumsTypes, AlbumWithoutId, OneAlbum} from '../../types';
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

export const getAlbum = createAsyncThunk<OneAlbum, string>(
  'get/oneAlbum',
  async (id) => {
    try {
      const response = await axiosApi.get<OneAlbum>('/albums/' + id);
      return response.data;
    } catch (err) {
      throw err;
    }
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
      formData.append('release', data.release.toString());

      if (data.image) {
        formData.append('image', data.image);
      }

      await axiosApi.post('/albums', formData);
    } catch (err) {
      throw err;
    }
  }
);


export const publishAlbum = createAsyncThunk<void, string>(
  'publish/artist',
  async (id) => {
    try {
      await axiosApi.patch('/albums/' + id + '/togglePublished');
    } catch (err) {
      throw err;
    }
  },
);

export const deleteAlbum = createAsyncThunk<void, string>(
  'delete/tracks',
  async (id) => {
    try {
      await axiosApi.delete('/albums/' + id);
    } catch (err) {
      throw err;
    }
  },
);