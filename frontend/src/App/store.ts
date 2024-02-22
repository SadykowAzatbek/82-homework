import {configureStore} from '@reduxjs/toolkit';
import {artistsReducer} from '../components/store/artistsSlice.ts';
import {albumsReducer} from '../components/store/albumsSlice.ts';

export const store = configureStore({
  reducer: {
    artists: artistsReducer,
    albums: albumsReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;