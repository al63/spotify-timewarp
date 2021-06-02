import { forwardRef } from 'react';
import { Box, Center, Container, Heading } from '@chakra-ui/react';
import { TrackList } from '../track-list';
import { SpotifyUser, Track } from '../../pages/api/spotify';
import { CreatePlaylistButton } from '../create-playlist';

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
    <Center minH="100vh" textColor="teal.500" bg="purple.50" ref={ref}>
      <Container maxW="container.xl">
        <Heading as="h1" size="lg" mb="2">
          Hey {user?.display_name},
        </Heading>
        <Heading size="sm">Your top songs for the past four weeks:</Heading>
        {tracks && (
          <>
            <TrackList tracks={tracks} />
            <Box my="2">
              <CreatePlaylistButton tracks={tracks} userId={user?.id} />
            </Box>
          </>
        )}
      </Container>
    </Center>
  );
});

export { TracksScreen };
