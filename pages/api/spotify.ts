import type { NextApiRequest, NextApiResponse } from 'next';

/* eslint-disable camelcase */
interface SpotifyExternalUrls {
  spotify: string;
}

interface SpotifyArtist {
  id: string;
  name: string;
  uri: string;
  external_urls: SpotifyExternalUrls;
}

interface SpotifyImage {
  height: number;
  width: number;
  url: string;
}

interface SpotifyAlbum {
  name: string;
  external_urls: SpotifyExternalUrls;
  images: SpotifyImage[];
}

interface SpotifyTrack {
  id: string;
  album: SpotifyAlbum;
  artists: SpotifyArtist[];
  name: string;
  external_urls: SpotifyExternalUrls;
  uri: string;
}

interface SpotifyTracksResponse {
  items: SpotifyTrack[];
}

export interface SpotifyUser {
  id: string;
  display_name: string;
  images: SpotifyImage[];
}
/* eslint-enable camelcase */

export interface Track {
  id: string;
  artists: {
    id: string;
    name: string;
    url: string;
    uri: string;
  }[];
  song: {
    url: string;
    uri: string;
    name: string;
  };
  album: {
    name: string;
    art: SpotifyImage[];
  };
}

export interface SpotifyData {
  user: SpotifyUser;
  tracks: Track[];
}

const getUserInfo = async (accessToken: string): Promise<SpotifyUser> => {
  const res = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const json = await res.json();
  return json;
};

const getTracks = async (
  accessToken: string,
  limit: number
): Promise<Track[]> => {
  const res = await fetch(
    `https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=${limit}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  const json = (await res.json()) as SpotifyTracksResponse;

  // flatten data to something easier for us to use
  return json.items.map((item) => ({
    id: item.id,
    artists: item.artists.map((artist) => ({
      id: artist.id,
      name: artist.name,
      url: artist.external_urls.spotify,
      uri: artist.uri,
    })),
    song: {
      url: item.external_urls.spotify,
      uri: item.uri,
      name: item.name,
    },
    album: {
      name: item.album.name,
      art: item.album.images,
    },
  }));
};

export default async (
  req: NextApiRequest,
  res: NextApiResponse<SpotifyData>
) => {
  if (typeof req.query.token !== 'string') {
    return res.status(400);
  }

  const userData = await getUserInfo(req.query.token);
  const trackData = await getTracks(req.query.token, 12);
  return res.status(200).json({
    user: userData,
    tracks: trackData,
  });
};
