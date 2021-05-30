import { ReactNode } from 'react';
import { UnorderedList, Link, ListItem } from '@chakra-ui/react';

import { Track } from '../pages/api/spotify';

interface Props {
  tracks: Track[] | null,
}

const TrackList = (props: Props) => {
  const { tracks } = props;
  if (!tracks) {
    return null;
  }

  const trackList = tracks?.map((track) => {
    const artistsList: ReactNode[] = [];
    track.artists.forEach((artist, idx) => {
      artistsList.push(<Link key={artist.id} href={artist.uri}>{artist.name}</Link>);
      if (idx + 1 !== track.artists.length) {
        artistsList.push(', ');
      }
    });

    return (
      <ListItem key={track.id}>
        {artistsList}
        {' '}
        -
        {' '}
        <Link href={track.song.uri}>{track.song.name}</Link>
      </ListItem>
    );
  });

  return (
    <UnorderedList>
      {trackList}
    </UnorderedList>
  );
};

export { TrackList };
