import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import axios from 'axios';
import APIKit from '../spotify';
import { useNavigate } from 'react-router-dom';

function Playlists(props) {
  const [playlists, setPlaylists] = useState([]);
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserPlaylists = async () => {
      try {
        if (user) {
          const response = await axios.get(`https://vibesvault-backend.vercel.app/playlists/userPlaylists`, {
            params: {
              userId: user.email,
            },
          });

          setPlaylists(response.data);
        }
      } catch (error) {
        console.error('Error fetching user playlists:', error);
      }
    };

    fetchUserPlaylists();
  }, [user]);

  useEffect(() => {
    const fetchFirstTrackForPlaylists = async () => {
      const updatedPlaylists = [];

      for (const playlist of playlists) {
        try {
          const response = await axios.get(`https://vibesvault-backend.vercel.app/playlists/playlistSongs`, {
            params: {
              playlistId: playlist.playlistId,
            },
          });

          const firstTrack = response.data[0]; 
        } catch (error) {
          console.error(`Error fetching first track for playlist ${playlist.playlistId}:`, error);
        }
      }

      // Update the state with the playlists and their first tracks
      setPlaylists(updatedPlaylists);
    };
  }, []);

  const handlePlaylistClick = async (playlistId) => {
    try {
      const response = await axios.get(`https://vibesvault-backend.vercel.app/playlists/playlistSongs`, {
        params: {
          playlistId: playlistId,
        },
      });

      const trackIds = response.data.map(track => track.trackId);

      props.setQueue([]);

      trackIds.map((trackId) => {
        APIKit.get(`/tracks/${trackId}`)
        .then((response) => {
          props.setQueue(prevQueue => [...prevQueue, response.data]);
        })
        .catch((error) => {
          console.error('Error fetching results:', error);
        });
      })

    } catch (error) {
      console.error(`Error fetching track IDs for playlist ${playlistId}:`, error);
    }

    const currentPath = window.location.pathname.split('/')[0];
    const newPath = `${currentPath}/dashboard/`.replace(/\/+/g, '/');
    navigate(newPath);
  };


  return (
    <div>
      <div>
        <div className="row m-0 p-0">
          <div className="col-2 m-0 p-0">
            <Sidebar />
          </div>
          <div className="col-10 m-0">
            <h4 className='playlists-head'>My Playlists</h4>
            <div className='playlist-container'>
              {playlists.map((playlist) => (
                <div key={playlist.id} className="playlist-item" onClick={() => handlePlaylistClick(playlist.playlistId)}>
                  <p className='playlist-name'>{playlist.playlistName}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Playlists;
