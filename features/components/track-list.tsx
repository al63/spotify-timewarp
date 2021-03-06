import { useEffect, useRef, useState, ReactNode } from 'react';
import { Box, Link, Image } from '@chakra-ui/react';

import { Track } from '../api/spotify';

interface Props {
  tracks: Track[] | null;
}

let rampId: number | null = null;
const clearRamp = () => {
  if (rampId) {
    clearInterval(rampId);
  }
  rampId = null;
};

/* eslint-disable no-param-reassign */
const rampVolume = (audio: HTMLAudioElement) => {
  clearRamp();
  audio.volume = 0;
  rampId = window.setInterval(() => {
    audio.volume = Math.min(audio.volume + 0.025, 0.75);
    if (audio.volume === 0.75 && rampId) {
      clearRamp();
    }
  }, 50);
};
/* eslint-enable no-param-reassign */

const TrackList = (props: Props) => {
  const { tracks } = props;
  const audioRef = useRef<HTMLAudioElement>(null);
  const [audio, setAudio] = useState<string | null>(null);

  useEffect(() => {
    if (audioRef.current) {
      rampVolume(audioRef.current);
      audioRef.current.pause();
      audioRef.current.load();

      if (audio) {
        (async () => {
          try {
            await audioRef.current?.play();
          } catch (e) {
            // swallow because we dont actually care about async audio issues
          }
        })();
      }
    }
    return clearRamp;
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
        <Image boxSize="35px" src={albumArt} me="2" />
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
