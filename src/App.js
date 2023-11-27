import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import FrontPage from './components/FrontPage';
import Home from './components/Home';
import { setClientToken } from './spotify';
import SpotifyLogin from './components/SpotifyLogin';
import axios from 'axios';

function App() {
  const [token, setToken] = useState("");

  // useEffect(() => {
  //   // Redirect the user to Spotify login
  //   const redirectToSpotifyLogin = async () => {
  //     try {
  //       const response = await axios.get('https://vibesvault-backend.vercel.app/users/spotify-login');
  //       // Assuming the response contains a redirect URL
  //       window.location.href = response.data.redirectUrl;
  //     } catch (error) {
  //       console.error('Error redirecting to Spotify login:', error);
  //     }
  //   };

  //   redirectToSpotifyLogin();
  // }, []);

  // Now, handle the callback after Spotify login
  useEffect(() => {
    const handleCallback = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const code = queryParams.get('code');

      console.log(code);
      if (code) {
        try {
          const response = await axios.get(`https://vibesvault-backend.vercel.app/users/callback?code=${code}`);

          setToken(response.data.access_token);
          setClientToken(response.data.access_token);
        } catch (error) {
          console.error('Error handling Spotify callback:', error);
        }
      }
    };

    handleCallback();
  }, []);

  return ( 
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route
          path="/dashboard/*"
          element={<Home token={token} setToken={setToken} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
