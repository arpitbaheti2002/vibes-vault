import React from 'react';

function AlbumDetails({ selectedTrack, queue }) {
  const track = selectedTrack || (queue.length > 0 && queue[0]);

  if (!track) {
    return <p>Queue is empty</p>;
  }

  return (
    <div className='album-details flex'>
      <h4>Album Details</h4>
      <img src={track.album.images[0].url} alt='album'/>
      <p className='song-name'> {track.name}</p>
      <p className='artists'> {track.artists.map((artist) => artist.name).join(', ')}</p>
    </div>
  );
}

export default AlbumDetails;
