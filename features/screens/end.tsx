import { forwardRef } from 'react';
import {
  Button,
  Center,
  Container,
  Link,
  Flex,
  Heading,
  Text,
} from '@chakra-ui/react';
import { Playlist } from '../api/spotify';

interface Props {
  playlist: Playlist | null;
}

const EndScreen = forwardRef<HTMLDivElement | null, Props>((props, ref) => {
  if (!props.playlist) {
    return null;
  }
  return (
    <Center
      minH="calc(100vh - 6rem)"
      textColor="green.700"
      bg="yellow.50"
      ref={ref}
    >
      <Container maxW="container.xl">
        <Flex direction="column" align="center">
          <Heading as="h1" size="xl" textAlign="center" mb="8">
            I made a playlist for you named{' '}
            <Text as="span" fontStyle="italic">
              {props.playlist.name}
            </Text>
            .
          </Heading>
          <Link href={props.playlist.uri}>
            <Button size="lg">Open playlist on Spotify</Button>
          </Link>
        </Flex>
      </Container>
    </Center>
  );
});

export { EndScreen };
