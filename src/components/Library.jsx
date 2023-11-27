import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import APIKit from '../spotify';
import { useNavigate } from 'react-router-dom';

function Library() {
  const navigate = useNavigate();
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    APIKit.get('/browse/featured-playlists?country=IN&offset=0')
      .then((response) => {
        setPlaylists(response.data.playlists.items);
      })
      .catch((error) => {
        console.error('Error fetching playlists:', error);
      });
    }, []);

    const handlePlaylistClick = (id) => {
      const currentPath = window.location.pathname.split('/')[0];
      const newPath = `${currentPath}/dashboard/`.replace(/\/+/g, '/');
      navigate(newPath, { state: { id: id } });
    }

  return (
    <div className="library-container">
      <div className="row m-0 p-0">
        <div className="col-2 m-0 p-0">
          <Sidebar />
        </div>
        <div className="col-10 m-0 playlist-container">
          {playlists.map((playlist) => (
            <div key={playlist.id} className="playlist-item" onClick={ () => handlePlaylistClick(playlist.id)}>
              <img className='playlist-image' src={playlist.images[0].url} alt={playlist.name} />
              <p className='playlist-name'>{playlist.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Library;
