// Dashboard.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import APIKit from '../spotify';
import Queue from './Queue';
import AlbumDetails from './AlbumDetails';
import Player from './Player';
import TrackItem from './TrackItem';

function Dashboard(props) {
  const [tracks, setTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [playlist_id, setPlaylistId] = useState('');
  const [showAddPlaylistPopup, setShowAddPlaylistPopup] = useState(false);
  const location = useLocation();

  const storedUser = localStorage.getItem('user');
  const user = storedUser ? JSON.parse(storedUser) : null;

  useEffect(() => {
    const fetchPlaylistAndTracks = async () => {
      try {
        if (location.state != null) {
          setPlaylistId(location.state.id);
        } else {
          const response = await APIKit.get('/browse/featured-playlists?country=IN&offset=0');
          setPlaylistId(response.data.playlists.items[0].id);
          console.log(playlist_id)
        }

        console.log(playlist_id);

        const tracksResponse = await APIKit.get(`playlists/${playlist_id}/tracks`);
        setTracks(tracksResponse.data.items);
      } catch (error) {
        console.error('Error fetching playlists and tracks:', error);
      }
    };

    fetchPlaylistAndTracks();
  }, [location, playlist_id]);

  const handleQueueClick = (index) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (props.queue[currentIndex]) {
      setCurrentTrack(props.queue[currentIndex]);
    }
  }, [currentIndex, props.queue]);

  const handlePlay = (track) => {
    props.addToQueue(track.track);
  };

  return (
    <div className="dashboard">
      <div className="row m-0 p-0">
        <div className="col-2 m-0 p-0">
          <Sidebar />
        </div>
        <div className="col-10 m-0 p-0 flex">
          <div className="player-container">
            <Player
              currentTrack={currentTrack}
              currentIndex={currentIndex}
              setCurrentIndex={setCurrentIndex}
              total={props.queue}
            />
          </div>
          <div className="album-details-container">
            <AlbumDetails selectedTrack={currentTrack} queue={props.queue} />
          </div>

          <div className="tracks-container">
            <h4>Tracks: </h4>
            <div className="tracks-list">
              {tracks.map((track) => (
                <TrackItem
                  key={track.id}
                  track={track}
                  onPlay={handlePlay}
                />
              ))}
            </div>
          </div>
          <div className="queue-container">
            <Queue tracks={props.queue} onQueueClick={handleQueueClick} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
