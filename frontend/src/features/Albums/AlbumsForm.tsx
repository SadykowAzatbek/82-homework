import {Box, Button, Grid, MenuItem, Select, SelectChangeEvent, TextField, Typography} from '@mui/material';
import React, {useEffect, useState} from 'react';
import FileInput from '../../components/UI/FileInput.tsx';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../App/hooks.ts';
import {AlbumWithoutId} from '../../types';
import {addAlbum} from './albumsThunks.ts';
import {getArtists} from '../Artists/artistsThunks.ts';
import {selectArtists} from '../Artists/artistsSlice.ts';

const AlbumsForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);

  useEffect(() => {
    const fetchUrl = async () => {
      await dispatch(getArtists());
    };

    void fetchUrl();
  }, [dispatch]);

  const [state, setState] = useState<AlbumWithoutId>({
    artist: '',
    name: '',
    release: '',
    image: '',
    isPublished: false,
  });

  const formSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await dispatch(addAlbum(state));
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
      artist: e.target.value,
    }));
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, files} = e.target;
    if (files) {
      setState(prevState => ({
        ...prevState, [name]: files[0]
      }));
    }
  };

  return (
    <>
      <Typography variant="h4">Add album</Typography>
      <Box component="form" onSubmit={formSubmit}>
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
              label="release"
              name="release"
              autoComplete="release"
              value={state.release}
              onChange={inputChange}
              fullWidth
            />
          </Grid>
          <Grid item xs={12} sx={{mb: "20px"}}>
            <Select
              required
              label="artist"
              id="artist"
              name="artist"
              value={state.artist}
              onChange={selectChange}
              fullWidth
            >
              {artists.map((elem) => (
                <MenuItem key={elem._id} value={elem._id}>
                  {elem.name}
                </MenuItem>
              ))}
            </Select>
          </Grid>
          <FileInput label="image" name="image" onChange={fileInputChangeHandler}/>
        </Grid>
        <Button type="submit">Create album</Button>
      </Box>
    </>
  );
};

export default AlbumsForm;