import type { NextApiRequest, NextApiResponse } from 'next';

export interface Artist {
    name: string;
}

export type MusicData = {
    topartists: {
        artist: Artist[]
    }
}


export const getData = async (): Promise<MusicData> => {
// TODO: https://www.last.fm/api/show/user.getTopArtists
  // this data is paginated.
  const res = await fetch(`http://ws.audioscrobbler.com/2.0/?period=12month&limit=1000&method=user.gettopartists&user=huked_apm15&api_key=${process.env.LASTFM_KEY}&format=json`);
  const data = await res.json();
  return data;
};

export default async (req: NextApiRequest, res: NextApiResponse<MusicData>) => {
  const data = await getData();
  return res.status(200).json(data);
};
