import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import Playlist from './components/Playlist';

const App = () => {
  const [playlistTracks, setPlaylistTracks] = useState([]);

  const addTrackToPlaylist = (track) => {
    setPlaylistTracks((prevTracks) => {
      if (!prevTracks.find(t => t.id === track.id)) {
        return [...prevTracks, track];
      }
      return prevTracks;
    });
  };

  return (
    <div>
      <h1>Spotify Search and Playlist</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h2>Search Results</h2>
          <SearchBar addTrackToPlaylist={addTrackToPlaylist} />
        </div>
        <div>
          <h2>Playlist</h2>
          <Playlist tracks={playlistTracks} />
        </div>
      </div>
    </div>
  );
};

export default App;

