import './App.css';
import {Grid, Typography} from '@mui/material';
import {Route, Routes} from 'react-router-dom';
import Artists from './components/Artists/Artists.tsx';

function App() {

  return (
    <>
      <header>
        <Grid>
          <Typography variant="h3">Music App</Typography>
        </Grid>
      </header>
      <Routes>
        <Route path="/" element={<Artists />} />
        <Route path="*" element={<strong>Not found!</strong>} />
      </Routes>
    </>
  )
}

export default App;
