import {useAppDispatch, useAppSelector} from '../../App/hooks.ts';
import {selectIsLoading, selectTracks} from '../store/tracksSlice.ts';
import {useEffect} from 'react';
import {getTracks} from '../store/asynсThunks.ts';
import {useParams} from 'react-router-dom';
import {Card, CardContent, CircularProgress, Grid, Typography} from '@mui/material';

const Tracks = () => {
  const dispatch = useAppDispatch();
  const tracks = useAppSelector(selectTracks);
  const isLoading = useAppSelector(selectIsLoading);

  const params = useParams();

  useEffect(() => {
    const fetchUrl = async () => {
      if (params.id) await dispatch(getTracks(params.id));
    };

    void fetchUrl();
  }, [dispatch]);

  return (
    <Grid container spacing={10} mt={3} alignItems="stretch">
      {!isLoading ? tracks.map((elem) => (
        <Grid item xs={3} key={elem._id}>
          <Card sx={{ minWidth: 230 }}>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                {'track: ' + elem.name}
              </Typography>
              <Typography variant="h5" component="div">
                {'duration: ' + elem.duration}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {'number: ' + elem.number}
              </Typography>
              <Typography variant="body2">

              </Typography>
            </CardContent>
          </Card>
        </Grid>
      )) : <CircularProgress />}
    </Grid>
  );
};

export default Tracks;