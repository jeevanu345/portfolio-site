import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { messages } = req.body;

    // Read resume.txt for context
    const resumePath = path.join(process.cwd(), 'data', 'resume.txt');
    const resumeContent = fs.readFileSync(resumePath, 'utf8');

    const systemMessage = {
      role: 'system',
      content: `You are an AI assistant for Jeevan U Gowda's personal portfolio website. You answer visitors' questions about Jeevan based on the following personal information:\n\n${resumeContent}\n\nBe concise, friendly, and professional. Do not make up information that is not in the text.`,
    };

    const response = await fetch(
      'https://integrate.api.nvidia.com/v1/chat/completions',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.NVIDIA_API_KEY}`,
        },
        body: JSON.stringify({
          model: 'meta/llama-3.1-8b-instruct',
          messages: [systemMessage, ...messages],
          temperature: 0.2,
          max_tokens: 1024,
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error('NVIDIA API Error:', errorData);
      return res
        .status(response.status)
        .json({ message: 'Error from NVIDIA API', error: errorData });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Chat API Error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
