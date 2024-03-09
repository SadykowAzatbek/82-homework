import {createAsyncThunk} from '@reduxjs/toolkit';
import {History, tracksHistoryTypes, TracksTypes, TrackWithoutId} from '../../types';
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

export const tracksHistoryPost = createAsyncThunk<void, tracksHistoryTypes>(
  'tracks/history',
  async (data) => {
    try {
      const headers = {
        'Authorization': `Bearer ${data.token}`,
      };

      await axiosApi.post<tracksHistoryTypes>('/track_history', {track: data.track}, {headers});
    } catch (err) {
      throw err;
    }
  },
);

export const getTracksHistory = createAsyncThunk<History[], string>(
  'get/history',
  async (token) => {
    try {
      const headers = {
        'Authorization': `Bearer ${token}`,
      };

      const response = await axiosApi.get<History[]>('/track_history', {headers});
      const items = response.data;

      if (!items) {
        return [];
      }

      return items;
    } catch (err) {
      throw err;
    }
  },
);

export const addTrack = createAsyncThunk<void, TrackWithoutId>(
  'add/track',
  async (data) => {
    try {
      await axiosApi.post('/tracks', data);
    } catch (err) {
      throw err;
    }
  },
);

export const publishTrack = createAsyncThunk<void, string>(
  'publish/artist',
  async (id) => {
    try {
      await axiosApi.patch('/tracks/' + id + '/togglePublished');
    } catch (err) {
      throw err;
    }
  },
);

export const deleteTrack = createAsyncThunk<void, string>(
  'delete/tracks',
  async (id) => {
    try {
      await axiosApi.delete('/tracks/' + id);
    } catch (err) {
      throw err;
    }
  },
);