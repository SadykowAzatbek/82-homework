import {AppBar, Button, Grid, styled, Toolbar, Typography} from '@mui/material';
import {Link as navLink} from 'react-router-dom';

const Link = styled(navLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit',
  },
});

const AppToolbar = () => {
  return (
    <>
      <AppBar position="sticky" sx={{mb: 2}}>
        <Toolbar>
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
              <Link to="/">Music App</Link>
            </Typography>
            <Button component={navLink} to="register" color="inherit">Sign Up</Button>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default AppToolbar;