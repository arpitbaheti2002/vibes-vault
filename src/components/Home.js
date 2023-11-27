import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom'; 
import SpotifyLogin from './SpotifyLogin';
import { loginEndpoint } from '../spotify';
import Search from './Search';
import Library from './Library';
import Profile from './Profile';
import Dashboard from './Dashboard';
import Playlists from './Playlists';

function Home(props) {
  const [queue, setQueue] = useState([]);
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  // Function to add a track to the queue
  const addToQueue = (selectedTrack) => {
    setQueue(prevQueue => [...prevQueue, selectedTrack]);
  };

  return (!props.token ? (
    <SpotifyLogin />
  ) : (
    <Routes>
      <Route path='/' element={<Dashboard queue={queue} addToQueue={addToQueue}/>} />
      <Route path='/search' element={<Search addToQueue={addToQueue}/>} />
      <Route path='/library' element={<Library />} />
      <Route path='/profile' element={<Profile user={user} />} /> 
      <Route path='/playlists' element={<Playlists setQueue={setQueue}/>} /> 
    </Routes>
  )
  );
}

export default Home;