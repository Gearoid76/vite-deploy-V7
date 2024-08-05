// src/components/SpotifyAuth.jsx
import React, { useEffect } from 'react';
import { AuthProvider, useAuth } from 'react-oauth2-pkce';

const SpotifyAuth = ({ onToken }) => {
  const { authService } = useAuth();

  useEffect(() => {
    if (authService && authService.isAuthenticated()) {
      const accessToken = authService.getAuthTokens().access_token;
      onToken(accessToken);
    }
  }, [authService, onToken]);

  const login = () => {
    if (authService) {
      authService.authorize();
    }
  };

  return (
    <div>
      <button onClick={login}>Login to Spotify</button>
    </div>
  );
};

const AuthWrapper = ({ children, onToken }) => (
  <AuthProvider
    authConfig={{
      clientId: import.meta.env.VITE_SPOTIFY_CLIENT_ID,
      authorizationEndpoint: 'https://accounts.spotify.com/authorize',
      redirectUri: window.location.origin,
      scopes: ['playlist-modify-public', 'playlist-modify-private'],
    }}
  >
    <SpotifyAuth onToken={onToken} />
    {children}
  </AuthProvider>
);

export default AuthWrapper;
