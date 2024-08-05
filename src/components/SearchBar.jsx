// src/components/SearchBar.jsx
import React, { useState } from 'react';
import axios from 'axios';
import getSpotifyToken from '../spotifyAuth';
import '../App.css';

const SearchBar = ({ addTrackToPlaylist }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

    const token = await getSpotifyToken();

    const response = await axios.get('https://api.spotify.com/v1/search', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      params: {
        q: query,
        type: 'track',
      },
    });

    setResults(response.data.tracks.items);
  };

  return (
    <div className="search-bar-container">
      <form onSubmit={handleSearch} className="search-bar-form">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a song"
          className="search-bar-input"
        />
        <button type="submit" className="search-bar-button">Search</button>
      </form>
      <div className="search-results-container">
        <ul className="search-results-list">
          {results.map((track) => (
            <li key={track.id}>
              {track.name} by {track.artists[0].name}
              <button onClick={() => addTrackToPlaylist(track)}>Add to Playlist</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchBar;
