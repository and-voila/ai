import { auth } from '@clerk/nextjs';
import { nanoid, OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';

import { ResponseRedis } from '@/lib/handleInngest';
import redisClient from '@/lib/upstash-redis';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = 'edge';

export async function POST(req: Request) {
  const json = await req.json();
  const { userId } = auth();
  const { messages } = json;

  if (!messages) {
    return new Response('Invalid request', { status: 400 });
  }

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    stream: true,
    messages,
  });

  const stream = OpenAIStream(response, {
    async onCompletion(completion) {
      const redisData = (await redisClient.get(userId)) as ResponseRedis;
      await redisClient.set(userId, {
        ...redisData,
        messages: [
          ...redisData?.messages,
          ...messages,
          {
            id: nanoid(),
            role: 'system',
            content: completion,
            createdAt: new Date(),
          },
        ],
      });
    },
  });

  return new StreamingTextResponse(stream);
}
