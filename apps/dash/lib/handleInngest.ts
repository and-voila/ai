'use server';
import { Redis } from '@upstash/redis/nodejs';
import { Inngest } from 'inngest';

import { WritingStyleType } from '@/inngest/functions';

const inngest = new Inngest({
  name: 'Writing assistant',
  eventKey: process.env.INNGEST_EVENT_KEY!,
});

export type ResponseRedis = {
  status: 'pending' | 'completed';
  writingAnalysis: WritingStyleType;
  combinedAnalysisInput: string;

  messages?: {
    id: string;
    role: 'system' | 'user';
    content: string;
    createdAt: Date;
  }[];
};

const redis = new Redis({
  url: 'https://adapted-feline-44562.upstash.io',
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

export async function handleWritingAnalysis({
  userId,
  samples,
}: {
  userId: string;
  samples: string[];
}) {
  await inngest.send({
    name: 'app/writing-analysis',
    data: {
      userId: userId,
      samples: samples,
    },
  });
}

export async function getUserWritingRedis(userId: string) {
  const res = (await redis.get(userId)) as ResponseRedis;
  // eslint-disable-next-line no-console
  console.log(res);
  return res;
}

export async function removeWritingRedis(userId: string) {
  const res = await redis.del(userId);
  return res;
}
