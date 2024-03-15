import {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../App/hooks.ts';
import {selectAlbums, selectIsLoading} from './albumsSlice.ts';
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
import {Link as RouterLink, useParams} from 'react-router-dom';
import {selectArtists} from '../Artists/artistsSlice.ts';
import {deleteAlbum, getAlbums, publishAlbum} from './albumsThunks.ts';
import {getArtists} from '../Artists/artistsThunks.ts';
import {selectUser} from '../Users/usersSlice.ts';
import {apiUrl} from '../../constants.ts';

const Albums = () => {
  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAlbums);
  const isLoading = useAppSelector(selectIsLoading);
  const artistName = useAppSelector(selectArtists);
  const user = useAppSelector(selectUser);

  const params = useParams();

  useEffect(() => {
    const fetchUrl = async () => {
      if (params.id) {
        await dispatch(getAlbums(params.id));
        await dispatch(getArtists());
      }
    };

    void fetchUrl();
  }, [dispatch, params.id]);

  const ImageCardMedia = styled(CardMedia)({
    height: 0,
    paddingTop: '56.25%',
  });

  const artist = artistName.find(elem => elem._id === params.id);

  const publish = async (id: string) => {
    await dispatch(publishAlbum(id));

    if (params.id) {
      await dispatch(getAlbums(params.id));
    }
  };

  const deleteOneAlbum = async (id: string) => {
    await dispatch(deleteAlbum(id));

    if (params.id) {
      await dispatch(getAlbums(params.id));
    }
  };

  return (
    <>
      {artist && <Typography variant="h4">{artist.name}</Typography>}
      <Grid container spacing={3} mt={3} alignItems="stretch">
        {!isLoading ? albums.map((elem) => (
          <Grid item key={elem._id}>
            {user?.role === 'admin' ? <Card sx={{maxWidth: 345}}>
              <CardActionArea>
                <RouterLink to={`/tracks/${elem._id}`}>
                  {elem.image ? <ImageCardMedia image={'http://localhost:8000/' + elem.image}/> : ''}
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {elem.name}
                    </Typography>
                    <Typography component="div">
                      {'Release: ' + elem.release}
                    </Typography>
                    <Typography gutterBottom component="div">
                      Статус: {!elem.isPublished ? 'неопубликовано' : 'опубликовано'}
                    </Typography>
                  </CardContent>
                </RouterLink>
              </CardActionArea>
              <Typography component="div" sx={{display: 'flex', justifyContent: 'space-between'}}>
                <Button sx={{color: 'red'}} onClick={() => deleteOneAlbum(elem._id)}>Удалить</Button>
                <Button onClick={() => publish(elem._id)}>{elem.isPublished ? 'Снять с публикации' : 'Опубликовать'}</Button>
              </Typography>
            </Card> : elem.isPublished ? <Card sx={{maxWidth: 345}}>
              <CardActionArea>
                <RouterLink to={`/tracks/${elem._id}`}>
                  {elem.image ? <ImageCardMedia image={apiUrl + '/' + elem.image}/> : ''}
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {elem.name}
                    </Typography>
                    <Typography component="div">
                      {'Release: ' + elem.release}
                    </Typography>
                  </CardContent>
                </RouterLink>
              </CardActionArea>
            </Card> : ''}
          </Grid>
        )) : <CircularProgress />}
      </Grid>
    </>
  );
};

export default Albums;