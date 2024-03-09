import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  styled,
  Typography
} from '@mui/material';
import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../App/hooks.ts';
import {selectArtists, selectIsLoading} from './artistsSlice.ts';
import {Link as RouterLink} from 'react-router-dom';
import {deleteArtist, getArtists, publishArtist} from './artistsThunks.ts';
import {selectUser} from '../Users/usersSlice.ts';

const Artists = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const isLoading = useAppSelector(selectIsLoading);
  const user = useAppSelector(selectUser);

  useEffect(() => {
    const fetchUrl = async () => {
      await dispatch(getArtists());
    };

    void fetchUrl();
  }, [dispatch]);

  const ImageCardMedia = styled(CardMedia)({
    height: 0,
    paddingTop: '56.25%',
  });

  const publish = async (id: string) => {
    await dispatch(publishArtist(id));
  };

  const deleteOneArtist = async (id: string) => {
    await dispatch(deleteArtist(id));
  };

  return (
    <>
      {<Grid container spacing={3} mt={3}>
        {!isLoading ? artists.map((elem) => (
          <Grid item xs={3} key={elem._id}>
            {user?.role === 'admin' ? <Card sx={{maxWidth: 500}}>
              <CardActionArea component="div">
                <RouterLink to={`/albums/${elem._id}`} style={{textDecoration: 'none'}}>
                  {elem.image !== null ? <ImageCardMedia image={`http://localhost:8000/${elem.image}`}/> : ''}
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {elem.name}
                    </Typography>
                    {user && user.role === 'admin' ? <Typography gutterBottom component="div">
                      Статус: {!elem.isPublished ? 'неопубликовано' : 'опубликовано'}
                    </Typography> : ''}
                  </CardContent>
                </RouterLink>
                {user && user.role === 'admin' ? (
                  <Typography component="div" sx={{display: 'flex', justifyContent: 'space-between'}}>
                    <Button sx={{color: 'red'}} onClick={() => deleteOneArtist(elem._id)}>Удалить</Button>
                    <Button onClick={() => publish(elem._id)}>Опубликовать</Button>
                  </Typography>
                ) : ''}
              </CardActionArea>
            </Card> : user?.role === "user" && elem.isPublished ? <Card sx={{maxWidth: 500}}>
              <CardActionArea component="div">
                <RouterLink to={`/albums/${elem._id}`} style={{textDecoration: 'none'}}>
                  {elem.image !== null ? <ImageCardMedia image={`http://localhost:8000/${elem.image}`}/> : ''}
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {elem.name}
                    </Typography>
                  </CardContent>
                </RouterLink>
              </CardActionArea>
            </Card> : ''}
          </Grid>
        )) : <CircularProgress/>}
      </Grid>}
    </>
  );
};

export default Artists;