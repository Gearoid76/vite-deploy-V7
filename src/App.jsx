import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import Playlist from './components/Playlist';
import SpotifyAuth from './components/SpotifyAuth';

const App = () => {
  const [playlistTracks, setPlaylistTracks] = useState([]);
  const [spotifyToken, setSpotifyToken] = useState(null);

  const addTrackToPlaylist = (track) => {
    setPlaylistTracks((prevTracks) => {
      if (!prevTracks.find(t => t.id === track.id)) {
        return [...prevTracks, track];
      }
      return prevTracks;
    });
  };

  const removeTrackFromPlaylist = (trackId) => {
    setPlaylistTracks((prevTracks) => prevTracks.filter(track => track.id !== trackId));
  };

  const savePlaylistToSpotify = async (playlistName) => {
    if (!spotifyToken) {
      alert('You need to log in to Spotify first!');
      return;
    }

    try {
      // Get the user's Spotify ID
      const userResponse = await axios.get('https://api.spotify.com/v1/me', {
        headers: { Authorization: `Bearer ${spotifyToken}` },
      });
      const userId = userResponse.data.id;

      // Create a new playlist
      const playlistResponse = await axios.post(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        {
          name: playlistName,
          public: false,
        },
        {
          headers: { Authorization: `Bearer ${spotifyToken}` },
        }
      );

      const playlistId = playlistResponse.data.id;

      // Add tracks to the new playlist
      await axios.post(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {
          uris: playlistTracks.map(track => track.uri),
        },
        {
          headers: { Authorization: `Bearer ${spotifyToken}` },
        }
      );

      alert('Playlist saved to Spotify!');
    } catch (error) {
      console.error('Error saving playlist:', error);
      alert('Failed to save playlist to Spotify.');
    }
  };

  return (
    <div>
      <h1>Spotify Search and Playlist</h1>
      <SpotifyAuth onToken={setSpotifyToken} />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h2>Search Results</h2>
          <SearchBar addTrackToPlaylist={addTrackToPlaylist} />
        </div>
        <div>
          <h2>Playlist</h2>
          <Playlist
            tracks={playlistTracks}
            removeTrackFromPlaylist={removeTrackFromPlaylist}
            savePlaylistToSpotify={savePlaylistToSpotify}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
