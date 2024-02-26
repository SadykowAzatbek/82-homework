import './App.css';
import {Alert} from '@mui/material';
import {Route, Routes} from 'react-router-dom';
import Artists from './features/Artists/Artists.tsx';
import Albums from './features/Albums/Albums.tsx';
import Tracks from './features/Tracks/Tracks.tsx';
import Register from './features/Users/Register.tsx';
import AppToolbar from './components/UI/AppToolbar.tsx';
import Login from './features/Users/Login.tsx';
import {useAppSelector} from './App/hooks.ts';
import {selectUser} from './features/Users/usersSlice.ts';
import TracksHistory from './features/Tracks/TracksHistory.tsx';

function App() {
  const user = useAppSelector(selectUser);

  return (
    <>
      <header>
        <AppToolbar />
      </header>
      <Routes>
        <Route path="/" element={user && <Artists />} />
        <Route path="/albums/:id" element={user && <Albums />} />
        <Route path="/tracks/:id" element={user && <Tracks />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/track_history" element={<TracksHistory />} />
        <Route path="*" element={<Alert severity="error">Not found!</Alert>} />
      </Routes>
    </>
  )
}

export default App;
