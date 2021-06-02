import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
} from '@chakra-ui/react';
import { SpotifyLogin } from '../components/spotify-login';
import { useSpotifyContext } from '../spotify-context';
import { TracksState } from './tracks';

interface Props {
  tracksState: TracksState;
  onLoggedInClicked: () => void;
}

const SplashScreen = ({ tracksState, onLoggedInClicked }: Props) => {
  const { user } = useSpotifyContext();
  let content;
  if (tracksState) {
    const text = user ? `Logged in as  ${user.display_name}` : 'Logged in';
    content = (
      <Button
        size="lg"
        onClick={onLoggedInClicked}
        isLoading={tracksState === 'loading'}
        loadingText="Loading..."
      >
        {text}
      </Button>
    );
  } else {
    content = <SpotifyLogin />;
  }

  return (
    <Center minH="100vh" textColor="pink.400" bg="teal.50">
      <Container maxW="container.xl">
        <Flex direction="column" align="center">
          <Heading as="h1" size="xl" textAlign="center">
            I make Spotify playlists based on your recent listening history.
            Spotify Wrapped, but for the past month.
          </Heading>
          <Box mt="8">{content}</Box>
        </Flex>
      </Container>
    </Center>
  );
};

export { SplashScreen };
