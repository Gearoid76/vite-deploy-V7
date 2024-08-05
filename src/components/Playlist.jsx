import React, { useState } from 'react';

const Playlist = () => {
  const [playlistName, setPlaylistName] = useState('My Playlist');
  const [playlistTracks, setPlaylistTracks] = useState([]);

  const renamePlaylist = (e) => {
    setPlaylistName(e.target.value);
  };

  const removeTrackFromPlaylist = (trackId) => {
    setPlaylistTracks(playlistTracks.filter(track => track.id !== trackId));
  };

  return (
    <div>
      <input
        type="text"
        value={playlistName}
        onChange={renamePlaylist}
        placeholder="Rename Playlist"
      />
      <ul>
        {playlistTracks.map((track) => (
          <li key={track.id}>
            {track.name} by {track.artists[0].name}
            <button onClick={() => removeTrackFromPlaylist(track.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Playlist;
