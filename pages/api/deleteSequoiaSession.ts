import type { NextApiRequest, NextApiResponse } from 'next';

// Retired: conversations are browser-local; no server deletion is necessary.
export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  res.setHeader('Cache-Control', 'no-store');
  return res
    .status(410)
    .json({ message: 'Use New chat to clear this browser’s conversation.' });
}
