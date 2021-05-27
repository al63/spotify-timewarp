import { useEffect } from 'react';

interface Props {
  onLogin: (accessToken: string) => void;
}

/* eslint-disable camelcase */
interface SpotifyHashSuccessParams {
  access_token: string;
  expires_in: string;
  token_bearer: string;
}
/* eslint-enable camelcase */

interface SpotifyHashErrorParams {
  error: string;
}

type SpotifyHashParams = SpotifyHashSuccessParams | SpotifyHashErrorParams;

const isSpotifyhashErrorParams = (params: SpotifyHashParams): params is SpotifyHashErrorParams => (params as SpotifyHashErrorParams).error !== undefined;

const generateSpotifyUrl = () => {
  // TODO: probably should add a state var
  const params = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || '',
    response_type: 'token',
    redirect_uri: 'http://localhost:3000/test',
    scope: 'user-top-read user-read-private user-read-email',
  });
  return `https://accounts.spotify.com/authorize?${params.toString()}`;
};

const SpotifyLogin = (props: Props) => {
  useEffect(() => {
    if (window.location.hash) {
      const params = window.location.hash.substring(1).split('&').reduce((prev, cur) => {
        const split = cur.split('=');
        return {
          ...prev,
          [split[0]]: split[1],
        };
      }, {}) as SpotifyHashParams;
      if (!isSpotifyhashErrorParams(params)) {
        window.history.pushState('', document.title, window.location.pathname);
        props.onLogin(params.access_token);
      }
    }
  }, []);

  return (
    <div>
      <a href={generateSpotifyUrl()}>Log in with spotify</a>
    </div>
  );
};

export { SpotifyLogin };
