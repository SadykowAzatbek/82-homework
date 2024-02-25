import {configureStore} from '@reduxjs/toolkit';
import {artistsReducer} from '../features/Artists/artistsSlice.ts';
import {albumsReducer} from '../features/Albums/albumsSlice.ts';
import {tracksReducer} from '../features/Tracks/tracksSlice.ts';

export const store = configureStore({
  reducer: {
    artists: artistsReducer,
    albums: albumsReducer,
    tracks: tracksReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;