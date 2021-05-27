import { useState } from 'react';
import Head from 'next/head';

import { SpotifyData, Track } from './api/spotify';
import { SpotifyLogin } from '../features/spotify-login';

const Test = () => {
  const [tracks, setTracks] = useState<Track[] | null>(null);
  const [displayName, setDisplayName] = useState<string>('');

  const onLogin = async (accessToken: string) => {
    const res = await fetch(`/api/spotify?token=${accessToken}`);
    const json = await res.json() as SpotifyData;
    setDisplayName(json.user.display_name);
    setTracks(json.tracks);
  };

  const tracksList = tracks?.map((track) => (
    <li id={track.id}>
      <h4>{track.song.name}</h4>
    </li>
  ));
  return (
    <>
      <Head>
        <title>test page</title>
        <meta name="description" content="text page" />
      </Head>
      <h1>I make Spotify playlists for you based on your recent listening history.</h1>
      <button type="button">Make a playlist of my top songs</button>
      <button type="button">Make a playlist of recommendations</button>

      {displayName ? (
        <>
          <h1>
            Logged in as
            {' '}
            {displayName}
          </h1>
          <ul>
            {tracksList}
          </ul>
        </>
      ) : <SpotifyLogin onLogin={onLogin} />}
    </>
  );
};

export default Test;
