import { forwardRef } from 'react';
import { CopyIcon, ExternalLinkIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Center,
  Container,
  Link,
  Flex,
  Heading,
  Text,
  useClipboard,
  Skeleton,
} from '@chakra-ui/react';
import { Playlist } from '../api/spotify';

interface Props {
  playlist: Playlist | null;
}

const EndScreen = forwardRef<HTMLDivElement | null, Props>((props, ref) => {
  const { hasCopied, onCopy } = useClipboard(props.playlist?.url || '');

  if (!props.playlist) {
    return null;
  }

  const shareText = hasCopied ? 'Link copied' : 'Copy share link';
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
          <Flex
            direction={{ base: 'column', md: 'row' }}
            align={{ base: 'center', md: 'flex-start' }}
          >
            <Box position="relative" mb="4" me={{ base: '0', md: '4' }}>
              <Skeleton width="300px" height="380px" />
              <Box position="absolute" top="0">
                <iframe
                  title="Playlist embed"
                  src={`https://open.spotify.com/embed/playlist/${props.playlist.id}`}
                  width="300"
                  height="380"
                  frameBorder="0"
                  allow="encrypted-media"
                />
              </Box>
            </Box>
            <Flex direction="column">
              <Link href={props.playlist.uri}>
                <Button size="lg" rightIcon={<ExternalLinkIcon />}>
                  Open on Spotify
                </Button>
              </Link>
              <Button
                mb="2"
                mt="4"
                size="lg"
                onClick={onCopy}
                rightIcon={<CopyIcon />}
              >
                {shareText}
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Container>
    </Center>
  );
});

export { EndScreen };
