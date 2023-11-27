import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PlaylistDisplay(props) {
  const [playlists, setPlaylists] = useState([]);
  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

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

  const isPlaylistNameExists = (name) => {
    return playlists.some((playlist) => playlist.playlistName === name);
  };

  const onCreatePlaylist = async () => {
    const playlistName = window.prompt('Enter playlist name:');

    if (playlistName) {
      if (isPlaylistNameExists(playlistName)) {
        alert('Playlist name already exists. Please choose a different name.');
      } else {
        try {
          // Call API to create a new playlist
          if (user) {
            const playlistResponse = await axios.post('https://vibesvault-backend.vercel.app/playlists/addPlaylist', {
              userId: user.email,
              playlistName,
              playlistId: Date.now().toString(), // You can use a better way to generate a unique ID
            });

            const newPlaylist = playlistResponse.data;

            // Update the playlists state
            setPlaylists((prevPlaylists) => [...prevPlaylists, newPlaylist]);

            // Call API to add the current track to the newly created playlist
            await axios.post('https://vibesvault-backend.vercel.app/playlists/addSong', {
              playlistId: newPlaylist.playlistId,
              trackName: props.track.name,
              artistName: props.track.artists.map((artist) => artist.name).join(', '),
              trackId: props.track.id,
            });

            alert(`Playlist "${playlistName}" created, and the track has been added!`);
          }
        } catch (error) {
          console.error('Error creating playlist and adding track:', error);
          alert('Error creating playlist. Please try again.');
        }
      }
    }
  };

  const onAddSong = ((playlistId) => {
    axios.post('https://vibesvault-backend.vercel.app/playlists/addSong', {
      playlistId: playlistId,
      trackName: props.track.name,
      artistName: props.track.artists.map((artist) => artist.name).join(', '),
      trackId: props.track.id,
    });

    alert(`The track has been added!`);
  })

  return (
    <div class="offcanvas offcanvas-end" tabindex="-1" id={`user-playlist-canvas-${props.track.id}`}>
      <div className="offcanvas-header">
        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas"></button>
      </div>
      <div className="offcanvas-body">
        <h3>Your Playlists</h3>
        <p>Add <span>"{props.track.name}"</span> to playlist</p>
   
        {playlists.map((playlist) => (
          <div className='user-playlist' key={playlist.playlistId} onClick={() => onAddSong(playlist.playlistId)}>{playlist.playlistName}</div>
        ))}
    
        <button className="create-playlist-button" onClick={onCreatePlaylist}>
          Create Playlist
        </button>
      </div>
    </div>
  );
}

export default PlaylistDisplay;
