import {useAppDispatch, useAppSelector} from '../../App/hooks.ts';
import {selectIsLoading, selectTracks} from './tracksSlice.ts';
import {useEffect} from 'react';
import {useParams} from 'react-router-dom';
import {Avatar, Button, Card, CardContent, CircularProgress, Grid, Typography} from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import {selectArtists} from '../Artists/artistsSlice.ts';
import {deleteTrack, getTracks, publishTrack, tracksHistoryPost} from './tracksThunks.ts';
import {getAlbum} from '../Albums/albumsThunks.ts';
import {selectUser} from '../Users/usersSlice.ts';
import {getArtists} from '../Artists/artistsThunks.ts';
import {selectAlbum, selectAlbumIsLoading} from '../Albums/albumSlice.ts';

const Tracks = () => {
  const dispatch = useAppDispatch();
  const tracks = useAppSelector(selectTracks);
  const isLoading = useAppSelector(selectIsLoading);
  const artistsData = useAppSelector(selectArtists);
  const albumData = useAppSelector(selectAlbum);
  const albumLoading = useAppSelector(selectAlbumIsLoading);
  const user = useAppSelector(selectUser);

  const params = useParams();

  const artist = artistsData.find(elem => elem._id === albumData?.artist._id);

  useEffect(() => {
    const fetchUrl = async () => {
      if (params.id) {
        await dispatch(getTracks(params.id));

        await dispatch(getAlbum(params.id));
        await dispatch(getArtists());
      }
    };

    void fetchUrl();
  }, [dispatch, params.id]);

  const tracksHistory = async (data: string) => {
    if (user) {
      await dispatch(tracksHistoryPost({token: user.token, track: data}));
    }
  };

  const publish = async (id: string) => {
    await dispatch(publishTrack(id));

    if (params.id) {
      await dispatch(getTracks(params.id));
    }

  };

  const deleteOneTrack = async (id: string) => {
    await dispatch(deleteTrack(id));

    if (params.id) {
      await dispatch(getTracks(params.id));
    }
  };

  return (
    <>
      {!albumLoading ? albumData && artist && <Typography variant="h4">Artist: {artist.name}, Album: {albumData.name}</Typography> : <CircularProgress />}

      <Grid container spacing={10} mt={3}>
        {!isLoading ? tracks.map((elem) => (
          <Grid item xs={3} key={elem._id}>
            {user && user.role === 'admin' ? <Card sx={{minWidth: 230}}>
              <CardContent>
                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                  {'number: ' + elem.number}
                </Typography>
                <Typography variant="h5" component="div">
                  {'track: ' + elem.name}
                </Typography>
                <Typography sx={{mb: 1.5}} color="text.secondary">
                  {'duration: ' + elem.duration}
                </Typography>
                <Typography gutterBottom component="div">
                  Статус: {!elem.isPublished ? 'неопубликовано' : 'опубликовано'}
                </Typography>
                {user && <Button sx={{p: '3px', mt: "10px"}} color="inherit" onClick={() => tracksHistory(elem._id)}>
                  <Avatar sx={{mr: 1, bgcolor: 'error.main'}}>
                    <PlayCircleIcon/>
                  </Avatar>
                  Play
                </Button>}
                {user && user.role === 'admin' ? (
                  <Typography component="div" sx={{display: 'flex', justifyContent: 'space-between', mt: "13px"}}>
                    <Button sx={{color: 'red'}} onClick={() => deleteOneTrack(elem._id)}>Удалить</Button>
                    <Button onClick={() => publish(elem._id)}>{elem.isPublished ? 'Снять с публикации' : 'Опубликовать'}</Button>
                  </Typography>
                ) : ''}
              </CardContent>
            </Card> : elem.isPublished ? <Card sx={{minWidth: 230}}>
              <CardContent>
                <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                  {'number: ' + elem.number}
                </Typography>
                <Typography variant="h5" component="div">
                  {'track: ' + elem.name}
                </Typography>
                <Typography sx={{mb: 1.5}} color="text.secondary">
                  {'duration: ' + elem.duration}
                </Typography>
                {user && <Button sx={{p: '3px'}} color="inherit" onClick={() => tracksHistory(elem._id)}>
                  <Avatar sx={{mr: 1, bgcolor: 'error.main'}}>
                    <PlayCircleIcon/>
                  </Avatar>
                  Play
                </Button>}
              </CardContent>
            </Card> : ''}
          </Grid>
        )) : <CircularProgress />}
      </Grid>
    </>
  );
};

export default Tracks;