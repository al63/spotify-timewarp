import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
} from '@chakra-ui/react';
import { SpotifyUser } from '../api/spotify';
import { SpotifyLogin } from '../components/spotify-login';

interface Props {
  loading: boolean;
  user: SpotifyUser | null;
  onLoggedInClicked: () => void;
}

const SplashScreen = ({ loading, user, onLoggedInClicked }: Props) => {
  let content;
  if (user || loading) {
    content = (
      <Button
        size="lg"
        onClick={onLoggedInClicked}
        isLoading={loading}
        loadingText="Loading..."
      >
        Logged in as {user?.display_name}
      </Button>
    );
  } else {
    content = <SpotifyLogin />;
  }

  return (
    <Center minH="100vh" textColor="pink.400" bg="teal.50">
      <Container maxW="container.xl">
        <Flex id="lol" direction="column" align="center">
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
