import React from 'react';
import { FaRegPlayCircle } from 'react-icons/fa';
import { MdAddCircleOutline } from 'react-icons/md';
import { IconContext } from 'react-icons/lib';
import PlaylistDisplay from './playlistDisplay';

const TrackItem = ({ track, onPlay }) => {
  const playlistDisplayProps = {
    track: track.track,
  };

  return (
    <div className="track-item">
      <p>{track.track.name}</p>
      <div className="buttons">
        <button className="track-button" onClick={() => onPlay(track)}>
          <IconContext.Provider value={{ size: '23px', className: 'trackbutton' }}>
            <FaRegPlayCircle />
          </IconContext.Provider>
        </button>

        <button
          className="track-button"
          data-bs-toggle="offcanvas"
          data-bs-target={`#user-playlist-canvas-${track.track.id}`}
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

export default TrackItem;
