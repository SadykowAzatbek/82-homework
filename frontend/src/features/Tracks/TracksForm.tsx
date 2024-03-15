import React, {useEffect, useState} from 'react';
import {Box, Button, CircularProgress, Grid, MenuItem, Select, SelectChangeEvent, TextField} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../App/hooks.ts';
import {TrackWithoutId} from '../../types';
import {addTrack} from './tracksThunks.ts';
import {getAllAlbums} from '../Albums/albumsThunks.ts';
import {selectAllAlbums, selectAllAlbumsLoading} from '../Albums/allAlbumsSlice.ts';

const TracksForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAllAlbums);
  const isLoading = useAppSelector(selectAllAlbumsLoading);

  useEffect(() => {
    const fetchUrl = async () => {
      await dispatch(getAllAlbums());
    };

    void fetchUrl();
  }, []);

  const [state, setState] = useState<TrackWithoutId>({
    album: '',
    name: '',
    duration: '',
    number: 0,
    isPublished: false,
  });
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await dispatch(addTrack(state));
    navigate('/');

  };

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const selectChange = (e: SelectChangeEvent) => {
    setState((prevState) => ({
      ...prevState,
      album: e.target.value,
    }));
  };
  return (
    <>
      <Box component="form" onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              label="name"
              name="name"
              autoComplete="name"
              value={state.name}
              onChange={inputChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="duration"
              name="duration"
              autoComplete="duration"
              value={state.duration}
              onChange={inputChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              required
              type="number"
              label="number"
              name="number"
              autoComplete="number"
              value={state.number}
              onChange={inputChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sx={{mb: "20px"}}>
            <Select
              required
              label="album"
              id="album"
              name="album"
              value={state.album}
              onChange={selectChange}
              fullWidth
            >
              {!isLoading ? albums.map((elem) => (
                <MenuItem key={elem._id} value={elem._id}>
                  {elem.name}
                </MenuItem>
              )) : <CircularProgress />}
            </Select>
          </Grid>
        </Grid>
        <Button type="submit" disabled={state.number <= 0}>Create track</Button>
      </Box>
    </>
  );
};

export default TracksForm;