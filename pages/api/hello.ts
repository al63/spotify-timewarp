// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

export type Data = {
  name: string
}

export const getData = async (): Promise<Data> => ({ name: ' John Doe' });

export default async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const data = await getData();
  return res.status(200).json(data);
};
