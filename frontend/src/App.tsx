import './App.css';
import {Alert, Typography} from '@mui/material';
import {Route, Routes} from 'react-router-dom';
import Artists from './components/Artists/Artists.tsx';
import Albums from './components/Albums/Albums.tsx';

function App() {
  return (
    <>
      <header>
        <Typography variant="h3">Music App</Typography>
      </header>
      <Routes>
        <Route path="/" element={<Artists />} />
        <Route path="/albums" element={<Albums />} />
        <Route path="/albums/:id" element={<Albums />} />
        <Route path="*" element={<Alert severity="error">Not found!</Alert>} />
      </Routes>
    </>
  )
}

export default App;
