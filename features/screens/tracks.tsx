import { forwardRef } from 'react';
import { Box, Container, Heading } from '@chakra-ui/react';
import { TrackList } from '../components/track-list';
import { SpotifyUser, Track } from '../api/spotify';
import { CreatePlaylistButton } from '../components/create-playlist';

interface Props {
  loading: boolean;
  tracks: Track[] | null;
  user: SpotifyUser | null;
}

const TracksScreen = forwardRef<HTMLDivElement | null, Props>((props, ref) => {
  const { tracks, user } = props;

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
            <Box my="4">
              <CreatePlaylistButton tracks={tracks} userId={user?.id} />
            </Box>
          </>
        )}
      </Container>
    </Box>
  );
});

export { TracksScreen };
