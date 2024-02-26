import {useAppDispatch, useAppSelector} from '../../App/hooks.ts';
import {selectIsLoading, selectTracks} from './tracksSlice.ts';
import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Avatar, Button, Card, CardContent, CircularProgress, Grid, Typography} from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import {selectArtists} from '../Artists/artistsSlice.ts';
import {selectAlbums} from '../Albums/albumsSlice.ts';
import {getTracks, tracksHistoryPost} from './tracksThunks.ts';
import {getAlbums} from '../Albums/albumsThunks.ts';
import {getArtists} from '../Artists/artistsThunks.ts';
import {selectUser} from '../Users/usersSlice.ts';

const Tracks = () => {
  const dispatch = useAppDispatch();
  const tracks = useAppSelector(selectTracks);
  const isLoading = useAppSelector(selectIsLoading);
  const artistName = useAppSelector(selectArtists);
  const albumName = useAppSelector(selectAlbums);
  const user = useAppSelector(selectUser);

  const params = useParams();

  const album = albumName.find(elem => elem._id === params.id);
  const artist = artistName.find(elem => elem._id === album?.artist);

  useEffect(() => {
    const fetchUrl = async () => {
      if (params.id) {
        await dispatch(getTracks(params.id));

        if (artist) {
          await dispatch(getAlbums(artist._id));
          await dispatch(getArtists());
        }
      }
    };

    void fetchUrl();
  }, [dispatch, params.id]);

  const tracksHistory = async (data: string) => {
    if (user) {
      await dispatch(tracksHistoryPost({token: user.token, track: data}));
    }
  };

  return (
    <>
      {album && artist && <Typography variant="h4">Artist: {artist.name}, Album: {album.name}</Typography>}

      <Grid container spacing={10} mt={3}>
        {!isLoading ? tracks.map((elem) => (
          <Grid item xs={3} key={elem._id}>
            <Card sx={{ minWidth: 230 }}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  {'number: ' + elem.number}
                </Typography>
                <Typography variant="h5" component="div">
                  {'track: ' + elem.name}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {'duration: ' + elem.duration}
                </Typography>
                <Button sx={{p: '3px'}} color='inherit' onClick={() => tracksHistory(elem._id)}>
                  <Avatar sx={{mr: 1, bgcolor: 'error.main'}}>
                    <PlayCircleIcon />
                  </Avatar>
                  Play
                </Button>
              </CardContent>
            </Card>
          </Grid>
        )) : <CircularProgress />}
      </Grid>
    </>
  );
};

export default Tracks;