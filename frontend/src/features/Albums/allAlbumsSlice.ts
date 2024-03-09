import {AlbumsTypes} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {getAlbums} from './albumsThunks.ts';
import {RootState} from '../../App/store.ts';

interface AllAlbums {
  albums: AlbumsTypes[];
  isLoading: boolean;
}

const initialState: AllAlbums = {
  albums: [],
  isLoading: false,
};

export const allAlbumsSlice = createSlice({
  name: 'all/albums',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAlbums.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getAlbums.fulfilled, (state, {payload: items}) => {
      state.isLoading = false;
      state.albums = items;
    });
    builder.addCase(getAlbums.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const allAlbumsReducer = allAlbumsSlice.reducer;
export const selectAllAlbums = (state: RootState) => state.allAlbums.albums;
export const selectAllAlbumsLoading = (state: RootState) => state.allAlbums.isLoading;