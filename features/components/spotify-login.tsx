import { useEffect } from 'react';
import { LinkBox, LinkOverlay, Button } from '@chakra-ui/react';
import { useSpotifyContext } from '../spotify-context';
import { CSR } from './csr';

/* eslint-disable camelcase */
interface SpotifyHashSuccessParams {
  access_token: string;
  expires_in: string;
  token_bearer: string;
  state: string;
}
/* eslint-enable camelcase */

interface SpotifyHashErrorParams {
  error: string;
  state: string;
}

type SpotifyHashParams = SpotifyHashSuccessParams | SpotifyHashErrorParams;

const isSpotifySuccessParams = (
  params: SpotifyHashParams
): params is SpotifyHashSuccessParams =>
  (params as SpotifyHashSuccessParams).access_token !== undefined;

const STATE_KEY = 'spotify_login_state';

const generateSpotifyUrl = () => {
  const state = Math.floor(Math.random() * 10000000).toString();
  window.localStorage.setItem(STATE_KEY, state);
  const params = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || '',
    response_type: 'token',
    redirect_uri: `${window.location.protocol}//${window.location.host}${window.location.pathname}`,
    scope:
      'user-top-read user-read-private user-read-email playlist-modify-public playlist-modify-private',
    state,
  });
  return `https://accounts.spotify.com/authorize?${params.toString()}`;
};

export const SpotifyLogin = () => {
  const context = useSpotifyContext();
  useEffect(() => {
    if (window.location.hash) {
      const params = window.location.hash
        .substring(1)
        .split('&')
        .reduce((prev, cur) => {
          const split = cur.split('=');
          return {
            ...prev,
            [split[0]]: split[1],
          };
        }, {}) as SpotifyHashParams;
      if (isSpotifySuccessParams(params)) {
        if (window.localStorage.getItem(STATE_KEY) === params.state) {
          window.localStorage.removeItem(STATE_KEY);
          window.history.pushState(
            '',
            document.title,
            window.location.pathname
          );
          context.setAccessToken(params.access_token);
        }
        // TODO: handle error cases
      }
    }
  }, []);

  const button = <Button size="lg">Log in with Spotify</Button>;
  return (
    <CSR
      onClient={() => (
        <LinkBox>
          <LinkOverlay href={generateSpotifyUrl()}>{button}</LinkOverlay>
        </LinkBox>
      )}
      placeHolder={button}
    />
  );
};
