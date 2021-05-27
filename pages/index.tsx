import { useState } from 'react';
import Head from 'next/head';
import {
  UnorderedList, ListItem, Container, Flex, Button, Heading,
} from '@chakra-ui/react';
import { SpotifyData, Track } from './api/spotify';
import { SpotifyLogin } from '../features/spotify-login';

const Index = () => {
  const [tracks, setTracks] = useState<Track[] | null>(null);
  const [displayName, setDisplayName] = useState<string>('');

  const onLogin = async (accessToken: string) => {
    const res = await fetch(`/api/spotify?token=${accessToken}`);
    const json = await res.json() as SpotifyData;
    setDisplayName(json.user.display_name);
    setTracks(json.tracks);
  };

  const tracksList = tracks?.map((track) => (
    <ListItem id={track.id}>
      {track.song.name}
    </ListItem>
  ));

  return (
    <>
      <Head>
        <title>test page</title>
        <meta name="description" content="text page" />
      </Head>

      <Container maxW="container.xl">
        <Flex direction="column" align="center">
          <Heading as="h1" size="xl">I make Spotify playlists based on your recent listening history.</Heading>
          <Flex>
            <Button m="2">Make a playlist of my top songs</Button>
            <Button m="2">Make a playlist of recommendations</Button>
          </Flex>
        </Flex>

        {displayName ? (
          <>
            <Heading as="h1" size="l">
              Logged in as
              {' '}
              {displayName}
            </Heading>
            <UnorderedList>
              {tracksList}
            </UnorderedList>
          </>
        ) : <SpotifyLogin onLogin={onLogin} />}
      </Container>
    </>
  );
};

export default Index;
