import {configureStore} from '@reduxjs/toolkit';
import {artistsReducer} from '../components/store/artistsSlice.ts';
import {albumsReducer} from '../components/store/albumsSlice.ts';
import {tracksReducer} from '../components/store/tracksSlice.ts';

export const store = configureStore({
  reducer: {
    artists: artistsReducer,
    albums: albumsReducer,
    tracks: tracksReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;