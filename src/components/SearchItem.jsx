import React from 'react';
import { FaRegPlayCircle } from "react-icons/fa";
import { MdAddCircleOutline } from "react-icons/md";
import { IconContext } from 'react-icons/lib';
import PlaylistDisplay from './playlistDisplay';

const SearchItem = ({ track, onPlay }) => {
  const playlistDisplayProps = {
    track: track,
  };

  return (
    <div className="track-item search-item">
      <div className='track-details'>
        <p>{track.name}</p>
        <p className="song-artist">
            {track?.album?.artists.map((artist) => artist.name).join(" | ")}
        </p>
      </div>
      <div className='buttons'>
        <button className="track-button" onClick={() => onPlay(track)}>
          <IconContext.Provider value={{size: "23px", className: "trackbutton"}}>
            <FaRegPlayCircle />
          </IconContext.Provider>
        </button>
        <button
          className="track-button"
          data-bs-toggle="offcanvas"
          data-bs-target={`#user-playlist-canvas-${track.id}`}
        >
          <IconContext.Provider value={{ size: '25px', className: 'trackbutton' }}>
            <MdAddCircleOutline />
          </IconContext.Provider>
        </button>
      </div>

      <PlaylistDisplay {...playlistDisplayProps} />
    </div>
  );
};

export default SearchItem;