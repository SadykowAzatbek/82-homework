import {UserTypes, ValidationError} from '../../types';
import {createSlice} from '@reduxjs/toolkit';
import {RootState} from '../../App/store.ts';
import {newUser} from './userThunks.ts';

interface UserState {
  user: UserTypes | null;
  registerLoading: boolean;
  registerError: ValidationError | null;
}

const initialState: UserState = {
  user: null,
  registerLoading: false,
  registerError: null,
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(newUser.pending, (state) => {
      state.registerLoading = true;
      state.registerError = null;
    });
    builder.addCase(newUser.fulfilled, (state, {payload: data}) => {
      state.registerLoading = false;
      state.user = data.user;
    });
    builder.addCase(newUser.rejected, (state, {payload: error}) => {
      state.registerLoading = false;
      state.registerError = error || null;
    });
  },
});

export const usersReducer = userSlice.reducer;

export const selectorUser = (state: RootState) => state.users.user;
export const selectorRegisterLoading = (state: RootState) => state.users.registerLoading;
export const selectorRegisterError = (state: RootState) => state.users.registerError;