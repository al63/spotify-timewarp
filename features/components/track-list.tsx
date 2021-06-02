import { useEffect, useRef, useState, ReactNode } from 'react';
import { Box, Link, Image } from '@chakra-ui/react';

import { Track } from '../api/spotify';

interface Props {
  tracks: Track[] | null;
}

const TrackList = (props: Props) => {
  const { tracks } = props;
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audio, setAudio] = useState<string | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load();
      if (audio) {
        audioRef.current.play();
      }
    }
  }, [audio]);

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
      <Box
        key={track.id}
        p="2"
        display="flex"
        alignItems="center"
        onMouseEnter={() => setAudio(track.song.previewUrl)}
        onMouseLeave={() => setAudio(null)}
        _hover={{
          background: 'purple.100',
        }}
      >
        <Image boxSize="40px" src={albumArt} me="2" />
        <Box>
          {artistsList} -{' '}
          <Link color="teal.700" href={track.song.uri}>
            {track.song.name}
          </Link>
        </Box>
      </Box>
    );
  });

  return (
    <>
      <Box display="inline-block">{trackList}</Box>
      <audio ref={audioRef}>
        {audio && <source src={audio} type="audio/mp3" />}
      </audio>
    </>
  );
};

export { TrackList };
