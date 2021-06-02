import { useState, useRef } from 'react';
import { Link, Button } from '@chakra-ui/react';
import { createPlaylist, Track } from '../api/spotify';
import { useSpotifyContext } from '../spotify-context';

interface Props {
  userId: string | null | undefined;
  tracks: Track[] | null;
}

type PlaylistState = null | 'creating' | 'created';

export const CreatePlaylistButton = (props: Props) => {
  const { userId, tracks } = props;
  const [playlistState, setPlaylistState] = useState<PlaylistState>(null);
  const playlistUri = useRef<string>('');
  const { accessToken } = useSpotifyContext();

  if (!userId || !tracks) {
    return null;
  }

  const makePlaylist = async () => {
    if (!userId || !tracks || !accessToken) {
      return;
    }

    setPlaylistState('creating');
    // TODO: error handling
    const uri = await createPlaylist(accessToken, userId, tracks);
    playlistUri.current = uri;
    setPlaylistState('created');
  };

  return playlistState === 'created' ? (
    <Link href={playlistUri.current}>
      <Button size="lg">Open Playlist on Spotify</Button>
    </Link>
  ) : (
    <Button
      size="lg"
      onClick={makePlaylist}
      isLoading={playlistState === 'creating'}
    >
      Make a playlist on Spotify
    </Button>
  );
};
