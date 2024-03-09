import { Box, Button, Grid, TextField } from "@mui/material";
import React, {useState} from 'react';
import FileInput from '../../components/UI/FileInput.tsx';
import {useNavigate} from 'react-router-dom';
import {useAppDispatch} from '../../App/hooks.ts';
import {ArtistWithoutId} from '../../types';
import {addArtists} from './artistsThunks.ts';

const ArtistsForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [state, setState] = useState<ArtistWithoutId>({
    name: '',
    image: '',
    info: '',
    isPublished: false,
  });

  const formSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await dispatch(addArtists(state));
    navigate('/');

  };

  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {name, value} = e.target;

    setState((prevState) => ({
      ...prevState,
      [name]: value,
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
          <Grid item xs={12} sx={{mb: "20px"}}>
            <TextField
              label="info"
              name="info"
              autoComplete="info"
              value={state.info}
              onChange={inputChange}
              fullWidth
            />
          </Grid>
          <FileInput label="image" name="image" onChange={fileInputChangeHandler}/>
        </Grid>
        <Button type="submit">Create artist</Button>
      </Box>
    </>
  );
};

export default ArtistsForm;