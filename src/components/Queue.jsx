import React from 'react';

function Queue(props) {
  return (
    <div className="queue">
      <h4>Up Next</h4>
      <div className='queue-list'>
        {props.tracks.map((track, index) => (
          <div key={track.id} onClick={() => props.onQueueClick(index)}>
            <p>{track.name.split("(")[0]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Queue;
