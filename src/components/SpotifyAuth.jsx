import React, { useEffect } from 'react';
import { useOAuth2 } from 'react-oauth2-hook';
import axios from 'axios';

const SpotifyAuth = ({ onToken }) => {
  const [authorize, { authData, error }] = useOAuth2({
    authorizeUrl: 'https://accounts.spotify.com/authorize',
    clientID: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
    redirectUri: window.location.origin,
    scope: 'playlist-modify-public playlist-modify-private',
  });

  useEffect(() => {
    if (authData) {
      onToken(authData.access_token);
    }
  }, [authData]);

  return (
    <div>
      <button onClick={authorize}>Login to Spotify</button>
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default SpotifyAuth;