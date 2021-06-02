import { useState, useRef } from 'react';
import { Button } from '@chakra-ui/react';
import { createPlaylist, Playlist, Track } from '../api/spotify';
import { useSpotifyContext } from '../spotify-context';

interface Props {
  tracks: Track[] | null;
  onPlaylistCreated: (playlist: Playlist) => void;
  onCreatedPlaylistClicked: () => void;
}

type PlaylistState = null | 'creating' | 'created';

export const CreatePlaylistButton = ({
  tracks,
  onPlaylistCreated,
  onCreatedPlaylistClicked,
}: Props) => {
  const [playlistState, setPlaylistState] = useState<PlaylistState>(null);
  const playlistUri = useRef<string>('');
  const { user, accessToken } = useSpotifyContext();

  if (!user || !tracks) {
    return null;
  }

  const makePlaylist = async () => {
    if (!user || !tracks || !accessToken) {
      return;
    }

    if (playlistState === 'created') {
      onCreatedPlaylistClicked();
      return;
    }

    setPlaylistState('creating');
    // TODO: error handling
    const playlist = await createPlaylist(accessToken, user.id, tracks);
    playlistUri.current = playlist.uri;
    setPlaylistState('created');
    onPlaylistCreated(playlist);
  };

  const text =
    playlistState === 'created'
      ? 'Created Playlist'
      : 'Make a playlist on Spotify';
  return (
    <Button
      size="lg"
      onClick={makePlaylist}
      isLoading={playlistState === 'creating'}
    >
      {text}
    </Button>
  );
};
