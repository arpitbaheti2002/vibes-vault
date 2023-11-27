import React from 'react';
import { loginEndpoint } from '../spotify';

function SpotifyLogin() {
  return (
    <div className='spotify-login'>
      <p>Login to Spotify using following account to get access to vast library of music</p>
      <p>email: vibesvault0@gmail.com</p>
      <p>password: vibesvault@user</p>
      <a href={loginEndpoint}><button className='front-page-button front-page-button-main'>LOG IN</button></a>
    </div>
  )
}

export default SpotifyLogin;
