import { ReactNode } from 'react';
import { Box, Link, Flex, Image } from '@chakra-ui/react';

import { Track } from '../api/spotify';

interface Props {
  tracks: Track[] | null;
}

const TrackList = (props: Props) => {
  const { tracks } = props;
  if (!tracks) {
    return null;
  }

  const trackList = tracks?.map((track) => {
    const artistsList: ReactNode[] = [];
    track.artists.forEach((artist, idx) => {
      artistsList.push(
        <Link key={artist.id} color="teal.700" href={artist.uri}>
          {artist.name}
        </Link>
      );
      if (idx + 1 !== track.artists.length) {
        artistsList.push(', ');
      }
    });

    const albumArt = track.album.art.sort((a, b) => a.width - b.width)[0].url;

    return (
      <Box key={track.id} my="2">
        <Flex align="center">
          <Image boxSize="40px" src={albumArt} me="2" />
          <Box>
            {artistsList} -{' '}
            <Link color="teal.700" href={track.song.uri}>
              {track.song.name}
            </Link>
          </Box>
        </Flex>
      </Box>
    );
  });

  return <>{trackList}</>;
};

export { TrackList };
