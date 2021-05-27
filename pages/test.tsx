import { useState } from 'react';
import Head from 'next/head';
import { SpotifyLogin } from '../features/spotify-login';

const Test = () => {
  const [displayName, setDisplayName] = useState<string>('');

  const onLogin = async (accessToken: string) => {
    const res = await fetch(`/api/spotify?token=${accessToken}`);
    const json = await res.json();
    setDisplayName(json.user.display_name);
    console.log(json);
  };

  return (
    <>
      <Head>
        <title>test page</title>
        <meta name="description" content="text page" />
      </Head>
      {displayName ? (
        <h1>
          Logged in as
          {displayName}
        </h1>
      ) : <SpotifyLogin onLogin={onLogin} />}
    </>
  );
};

export default Test;
