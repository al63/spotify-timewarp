import { useState, useEffect, forwardRef } from 'react';
import { Box, Center, Container, Heading } from '@chakra-ui/react';
import { TrackList } from '../components/track-list';
import { getTracks, Playlist, Track } from '../api/spotify';
import { CreatePlaylistButton } from '../components/create-playlist';
import { useSpotifyContext } from '../spotify-context';

export type TracksState = null | 'loading' | 'loaded';

interface Props {
  onTracksState: (state: TracksState) => void;
  onPlaylistCreated: (playlist: Playlist) => void;
  onCreatedPlaylistClicked: () => void;
}

const TracksScreen = forwardRef<HTMLDivElement | null, Props>((props, ref) => {
  const [tracks, setTracks] = useState<Track[] | null>(null);
  const { accessToken, user } = useSpotifyContext();

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    (async () => {
      // TODO: error handling
      props.onTracksState('loading');
      const spotifyTracks = await getTracks(accessToken, 12);
      setTracks(spotifyTracks);
      props.onTracksState('loaded');
    })();
  }, [accessToken]);

  if (!tracks) {
    return null;
  }

  return (
    <Box minH="100vh" pt="4" textColor="teal.500" bg="purple.50" ref={ref}>
      <Container maxW="container.xl">
        <Center>
          <Heading as="h2" size="xl" mb="3">
            Hey {user?.display_name}, here are your top songs of the past four
            weeks
          </Heading>
        </Center>
        {tracks && (
          <>
            <TrackList tracks={tracks} />
            <Box pt="3">
              <CreatePlaylistButton
                tracks={tracks}
                onPlaylistCreated={props.onPlaylistCreated}
                onCreatedPlaylistClicked={props.onCreatedPlaylistClicked}
              />
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
});

export { TracksScreen };
