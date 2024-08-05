import React, { useState } from 'react';
import '../App.css';

const Playlist = ({ tracks, removeTrackFromPlaylist, savePlaylistToSpotify }) => {
  const [playlistName, setPlaylistName] = useState('My Playlist');

  const renamePlaylist = (e) => {
    setPlaylistName(e.target.value);
  };

  return (
    <div className="playlist-container">
      <div className="playlist-header">
        <input
          type="text"
          value={playlistName}
          onChange={renamePlaylist}
          placeholder="Rename Playlist"
          className="playlist-name-input"
        />
        <button onClick={() => savePlaylistToSpotify(playlistName)} className="save-playlist-button">
          Save Playlist to Spotify
        </button>
      </div>
      <ul className="playlist-tracks">
        {tracks.map((track) => (
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
