import { useEffect } from 'react';
import { LinkBox, LinkOverlay, Button } from '@chakra-ui/react';
import { useSpotifyContext } from './spotify-context';
import { CSR } from './csr';

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

const isSpotifyhashErrorParams = (
  params: SpotifyHashParams
): params is SpotifyHashErrorParams =>
  (params as SpotifyHashErrorParams).error !== undefined;

const generateSpotifyUrl = () => {
  // TODO: probably should add a state var
  const params = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || '',
    response_type: 'token',
    redirect_uri: window.location.href.split('?')[0],
    scope:
      'user-top-read user-read-private user-read-email playlist-modify-public playlist-modify-private',
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
      if (!isSpotifyhashErrorParams(params)) {
        window.history.pushState('', document.title, window.location.pathname);
        context.setAccessToken(params.access_token);
      }
    }
  }, []);

  return (
    <CSR
      onClient={() => (
        <LinkBox>
          <LinkOverlay href={generateSpotifyUrl()}>
            <Button>Log in with Spotify</Button>
          </LinkOverlay>
        </LinkBox>
      )}
    />
  );
};
