'use client';
import { useAuth } from '@clerk/nextjs';
import { Message } from 'ai';
import React, { Dispatch, SetStateAction } from 'react';
import { Button } from 'ui';

import { WritingStyleType } from '@/inngest/functions';
import {
  getUserWritingRedis,
  handleBlogPostGenerator,
} from '@/lib/handleInngest';

const TOPIC_ONE = `
Create a well-structured blog post of 750 words or less on the topic: "Empowering Creators with AI: A New Dawn of Possibilities". The blog post should discuss the following:
1. Introduction: Brief overview of AI and its relevance in today's world.
2. Body: Explain how AI is empowering creators, providing examples of AI tools and platforms that creators are using to enhance their creativity and efficiency. Discuss the impact of AI on different domains of creativity like art, music, writing, and more.
3. Conclusion: Forecast on the future implications of AI for creators and how it will revolutionize creativity.
`;

const generateOptions = [
  {
    event: 'app/generate-blogpost',
    label: 'Generate Blog',
  },
  {
    event: 'app/generate-email-template',
    label: 'Email Template',
  },
  {
    event: 'app/generate-twitter-thread',
    label: 'Twitter Thread',
  },
];

type ResponseRedis = {
  status: 'pending' | 'completed';
  writingAnalysis: WritingStyleType;
  messages?: {
    id: string;
    role: 'system' | 'user';
    content: string;
  }[];
};

function GenerateBlog({
  setLearnMessages,
  setLoading,
}: {
  setLearnMessages: Dispatch<SetStateAction<Message[]>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}) {
  const { userId } = useAuth();

  async function analyzedSample() {
    let response: ResponseRedis | null = null;
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 10000));

    do {
      const res = await getUserWritingRedis(userId);
      response = res; // Update the response based on API result
      // eslint-disable-next-line no-console
      console.log(response);

      if (response?.status === 'pending') {
        await new Promise((resolve) => setTimeout(resolve, 10000));
      }
    } while (response?.status === 'pending');

    if (response) {
      setLearnMessages((prevMessages) => [
        ...prevMessages,
        ...response.messages!,
      ]);
    }
    setLoading(false);
  }

  async function handlegenerate() {
    await handleBlogPostGenerator({
      userId,
      idea: TOPIC_ONE,
    });
    await analyzedSample();
  }

  return (
    <div className="mb-10 block grid w-full grid-cols-3 gap-4">
      {generateOptions.map((option) => (
        <Button
          key={option.event}
          className="p-8 text-2xl"
          onClick={async () => {
            setLearnMessages((prevMessages) => [
              ...prevMessages,
              {
                id: 'writing-sample',
                role: 'system',
                content: 'loading...',
              },
            ]);
            await handlegenerate();
          }}
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}

export default GenerateBlog;
