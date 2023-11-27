import React, { useState } from 'react';
import Sidebar from './Sidebar';
import SearchItem from './SearchItem';
import APIKit from '../spotify';
import { useLocation, useNavigate } from 'react-router-dom';

function Search({addToQueue}) {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async () => {
    APIKit.get(`/search?q=${searchQuery}&type=track&limit=20`)
      .then((response) => {
        setSearchResults(response.data.tracks.items);
      })
      .catch((error) => {
        console.error('Error fetching results:', error);
      });
  };

  const handleAddPlaylist = ((track) => {

  })

  const handleAddToQueue = (selectedTrack) => {
    console.log(selectedTrack)
    addToQueue(selectedTrack);
    const currentPath = window.location.pathname.split('/')[0];
    const newPath = `${currentPath}/dashboard/`.replace(/\/+/g, '/');
    navigate(newPath);
  };

  return (
    <div>
      <div className="row m-0 p-0">
        <div className="col-2 m-0 p-0">
          <Sidebar />
        </div>
        <div className="col-10 m-0 search-container">
          <h2>Search</h2>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for tracks"
          />
          <button className="front-page-button front-page-button-main" onClick={handleSearch}>Search</button>
          <div className='search-results-container'>
            {searchResults.map((track) => (
              <SearchItem
                key={track.id}
                track={track}
                onPlay={handleAddToQueue}
                onAddPlaylist={handleAddPlaylist}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Search
