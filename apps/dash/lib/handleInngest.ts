'use server';

import { inngest } from '@/inngest/functions';

import redisClient from './upstash-redis';

export type ResponseRedis = {
  status: 'pending' | 'completed';
  combinedAnalysisInput: string;

  messages?: {
    id: string;
    role: 'system' | 'user';
    content: string;
    createdAt: Date;
  }[];
};

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
  const res = (await redisClient.get(userId)) as ResponseRedis;
  // eslint-disable-next-line no-console
  console.log(res);
  return res;
}

export async function removeWritingRedis(userId: string) {
  const res = await redisClient.del(userId);
  return res;
}
