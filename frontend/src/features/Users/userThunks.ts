import {createAsyncThunk} from '@reduxjs/toolkit';
import {RegisterMutation, RegisterResponse, ValidationError} from '../../types';
import axiosApi from '../../axiosApi.ts';
import {isAxiosError} from 'axios';

export const newUser = createAsyncThunk<RegisterResponse, RegisterMutation, {rejectValue: ValidationError}>(
  'users/register',
  async (registerMutation, {rejectWithValue}) => {
    try {
      const response = await axiosApi.post('/users', registerMutation);
      return response.data;
    } catch (err) {
      if (isAxiosError(err) && err.response && err.response.status === 422) {
        return rejectWithValue(err.response.data);
      }

      throw err;
    }
  }
);