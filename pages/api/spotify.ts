import type { NextApiRequest, NextApiResponse } from 'next';

const getUserInfo = async (accessToken: string): Promise<any> => {
  const res = await fetch('https://api.spotify.com/v1/me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const json = await res.json();
  return json;
};

const getTracks = async (accessToken: string): Promise<any> => {
  const res = await fetch('https://api.spotify.com/v1/me/top/tracks?time_range=short_term&limit=50', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const json = await res.json();
  return json;
};

export default async (req: NextApiRequest, res: NextApiResponse<any>) => {
  if (typeof req.query.token !== 'string') {
    return res.status(400);
  }

  const userData = await getUserInfo(req.query.token);
  const trackData = await getTracks(req.query.token);
  return res.status(200).json({
    user: userData,
    tracks: trackData,
  });
};
