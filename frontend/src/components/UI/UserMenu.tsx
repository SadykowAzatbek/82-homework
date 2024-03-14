import React, {useState} from 'react';
import {UserTypes} from '../../types';
import {Avatar, Button, CardMedia, Menu, MenuItem, styled} from '@mui/material';
import {useNavigate} from 'react-router-dom';
import {logout} from '../../features/Users/usersThunks.ts';
import {useAppDispatch} from '../../App/hooks.ts';
import {apiUrl} from '../../constants.ts';

interface Props {
  user: UserTypes;
}

const UserMenu: React.FC<Props> = ({user}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNav = () => {
    navigate('/track_history');
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  const toNewArtist = () => {
    navigate('/new/artist');
  };

  const toNewAlbum = () => {
    navigate('/new/album');
  };

  const toNewTrack = () => {
    navigate('/new/track');
  };

  const ImageCardMedia = styled(CardMedia)({
    height: 0,
    padding: '22px',
    borderRadius: '50%',
    marginLeft: '10px'
  });

  return (
    <>
      <Button color="inherit" onClick={handleClick}>
        Hello, {user.displayName}!
      </Button>
      {user.image ? <ImageCardMedia image={`${apiUrl}/${user.image}`}/> : <Avatar sx={{ml: 2}} />}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose} keepMounted>
        <MenuItem onClick={toNewArtist}>Add artist</MenuItem>
        <MenuItem onClick={toNewAlbum}>Add album</MenuItem>
        <MenuItem onClick={toNewTrack}>Add track</MenuItem>
        <MenuItem onClick={handleNav}>Track history</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;