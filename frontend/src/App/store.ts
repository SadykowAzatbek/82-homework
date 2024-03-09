import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {artistsReducer} from '../features/Artists/artistsSlice.ts';
import {albumsReducer} from '../features/Albums/albumsSlice.ts';
import {tracksReducer} from '../features/Tracks/tracksSlice.ts';
import {usersReducer} from '../features/Users/usersSlice.ts';
import {persistReducer, FLUSH, PAUSE, PERSIST, REHYDRATE, PURGE, REGISTER, persistStore} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import {tracksHistoryReducer} from '../features/Tracks/tracksHistorySlice.ts';
import {allAlbumsReducer} from '../features/Albums/allAlbumsSlice.ts';

const usersPersistConfig = {
  key: 'music:users',
  storage: storage,
  whitelist: ['user'],
}

const rootReducer = combineReducers({
  artists: artistsReducer,
  albums: albumsReducer,
  tracks: tracksReducer,
  users: persistReducer(usersPersistConfig, usersReducer),
  tracksHistory: tracksHistoryReducer,
  allAlbums: allAlbumsReducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, PAUSE, PERSIST, REHYDRATE, PURGE, REGISTER]
    }
  })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;