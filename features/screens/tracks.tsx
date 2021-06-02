import { useState, useEffect, forwardRef } from 'react';
import { Box, Container, Heading } from '@chakra-ui/react';
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
        <Heading as="h1" size="lg" mb="2">
          Hey {user?.display_name},
        </Heading>
        <Heading size="sm">Your top songs for the past four weeks:</Heading>
        {tracks && (
          <>
            <TrackList tracks={tracks} />
            <Box py="4">
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
