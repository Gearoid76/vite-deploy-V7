import React, { useState } from 'react';

const Playlist = ({ tracks, removeTrackFromPlaylist, savePlaylistToSpotify }) => {
  const [playlistName, setPlaylistName] = useState('My Playlist');

  const renamePlaylist = (e) => {
    setPlaylistName(e.target.value);
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
        {tracks.map((track) => (
          <li key={track.id}>
            {track.name} by {track.artists[0].name}
            <button onClick={() => removeTrackFromPlaylist(track.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={() => savePlaylistToSpotify(playlistName)}>Save Playlist to Spotify</button>
    </div>
  );
};

export default Playlist;
