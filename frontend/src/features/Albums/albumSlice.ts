import { createSlice } from '@reduxjs/toolkit';
import { OneAlbum } from '../../types';
import {getAlbum} from './albumsThunks.ts';
import {RootState} from '../../App/store.ts';

interface AlbumState {
  album: OneAlbum | null;
  isLoading: boolean;
}

const initialState: AlbumState = {
  album: null,
  isLoading: false,
};

const albumSlice = createSlice({
  name: 'album',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAlbum.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAlbum.fulfilled, (state, action) => {
      state.album = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getAlbum.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const albumReducer = albumSlice.reducer;
export const selectAlbum = (state: RootState) => state.album.album;
export const selectAlbumIsLoading = (state: RootState) => state.album.isLoading;