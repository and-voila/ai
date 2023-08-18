'use server';
import { Redis } from '@upstash/redis/nodejs';
import { Inngest } from 'inngest';

const inngest = new Inngest({
  name: 'Writing assistant',
  eventKey: process.env.INNGEST_EVENT_KEY!,
});

type ResponseRedis = {
  status: 'pending' | 'completed';
  blogPost: string;
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

export async function handleBlogPostGenerator({
  idea,
  userId,
}: {
  idea: string;
  userId: string;
}) {
  await inngest.send({
    name: 'app/generate-blogpost',
    data: {
      idea: idea,
      userId,
    },
  });
}

export async function getUserWrittingRedis(userId: string) {
  const res = (await redis.get(userId)) as ResponseRedis;
  return res;
}
