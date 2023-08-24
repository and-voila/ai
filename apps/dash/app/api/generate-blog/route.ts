/* eslint-disable no-console */
import { auth } from '@clerk/nextjs';
import { Redis } from '@upstash/redis';
import { nanoid, OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';

import { WritingStyleType } from '@/inngest/functions';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = 'edge';

const redis = new Redis({
  url: 'https://adapted-feline-44562.upstash.io',
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

type ResponseRedis = {
  status: 'pending' | 'completed';
  writingAnalysis: WritingStyleType;
  messages?: {
    id: string;
    role: 'system' | 'user';
    content: string;
    createdAt: Date;
  }[];
};

export async function POST(req: Request) {
  const { userId } = auth();
  const { prompt, messages } = (await req.json()) as {
    prompt: string;
    messages: {
      role: 'system' | 'user' | 'assistant' | 'function';
      content: string | null;
      name: string;
    }[];
  };

  if (!prompt) {
    return new Response('Invalid request', { status: 400 });
  }

  const stream = OpenAIStream(
    await openai.chat.completions.create({
      model: 'gpt-4',
      stream: true,
      messages,
    }),
    {
      async onCompletion(completion) {
        const redisData = (await redis.get(userId)) as ResponseRedis;
        console.log('completion', completion);
        await redis.set(userId, {
          ...redisData,
          messages: [
            ...redisData.messages,
            {
              id: nanoid(),
              role: 'system',
              content: completion,
              createdAt: new Date(),
            },
          ],
        });
      },
    },
  );

  return new StreamingTextResponse(stream);
}
