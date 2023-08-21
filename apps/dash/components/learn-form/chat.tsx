'use client';
import { useAuth } from '@clerk/nextjs';
import { Message } from 'ai';
import { useCallback, useEffect, useState } from 'react';
import { Avatar, Button, cn, Separator } from 'ui';

import { WritingStyleType } from '@/inngest/functions';
import {
  getUserWrittingRedis,
  handleBlogPostGenerator,
} from '@/lib/handleInngest';

import { Logomark } from '../logo';
import { MemoizedReactMarkdown } from '../markdown';
import { WrittingSample } from './writting-sample';

export interface ChatMessageProps {
  message: Message;
}

export interface ChatList {
  messages: {
    role: 'user' | 'system' | 'assistant';
    content: string;
  }[];
}

type ResponseRedis = {
  status: 'pending' | 'completed';
  writtingAnalysis: WritingStyleType;
  messages?: {
    id: string;
    role: 'system' | 'user';
    content: string;
  }[];
};

const TOPIC_ONE = `
Create a well-structured blog post of 750 words or less on the topic: "Empowering Creators with AI: A New Dawn of Possibilities". The blog post should discuss the following:

1. Introduction: Brief overview of AI and its relevance in today's world.
2. Body: Explain how AI is empowering creators, providing examples of AI tools and platforms that creators are using to enhance their creativity and efficiency. Discuss the impact of AI on different domains of creativity like art, music, writing, and more.
3. Conclusion: Forecast on the future implications of AI for creators and how it will revolutionize creativity.
`;

export function ChatMessage({ message, ...props }: ChatMessageProps) {
  return (
    <div className={cn('my-10 flex')} {...props}>
      <div
        className={cn(
          'flex h-8 w-8 items-center justify-center rounded border border-primary-foreground ',
          message.role === 'user' ? 'bg-muted' : 'bg-primary',
        )}
      >
        {message.role === 'user' ? (
          <Avatar />
        ) : (
          <Logomark className="h-6 w-6" />
        )}
      </div>
      <div className="ml-4 flex-1 space-y-2 overflow-hidden px-1">
        <MemoizedReactMarkdown
          className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
          components={{
            p({ children }) {
              return <p className="mb-2 last:mb-0">{children}</p>;
            },
            code({ inline, className, children, ...props }) {
              if (children.length) {
                if (children[0] == '▍') {
                  return (
                    <span className="mt-1 animate-pulse cursor-default">▍</span>
                  );
                }

                children[0] = (children[0] as string).replace('`▍`', '▍');
              }

              if (inline) {
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }
            },
          }}
        >
          {message.content}
        </MemoizedReactMarkdown>
      </div>
    </div>
  );
}

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

export function ChatList() {
  const { userId } = useAuth();
  const [learnMessages, setLearnMessages] = useState<Message[]>([]);
  const [sampleAnalysisDone, setSampleAnalysisDone] = useState(false);
  const [processedMessageIds, setProcessedMessageIds] = useState<
    Record<string, boolean>
  >({});

  const analyzedSample = useCallback(async () => {
    let response: ResponseRedis | null = null; // Initialize response as null
    do {
      const res = await getUserWrittingRedis(userId);
      if (res?.status === 'completed') {
        response = res;
      }
      if (response?.status === 'pending') {
        await new Promise((resolve) => setTimeout(resolve, 10000));
      }
    } while (response?.status !== 'completed');

    if (response) {
      const newMessages = response.messages.filter(
        (message) => !processedMessageIds[message.id],
      );

      if (newMessages.length > 0) {
        const newProcessedIds: Record<string, boolean> = {};
        newMessages.forEach((message) => {
          newProcessedIds[message.id] = true;
        });

        setProcessedMessageIds((prevIds) => ({
          ...prevIds,
          ...newProcessedIds,
        }));

        setLearnMessages((prev) => [
          ...prev,
          ...newMessages.map((message) => ({
            id: message.id,
            role: message.role,
            content: message.content,
          })),
        ]);

        setSampleAnalysisDone(true);
      }
    }
  }, [userId, processedMessageIds]);

  useEffect(() => {
    analyzedSample();
  }, [analyzedSample]);

  return (
    <div className="relative mx-auto px-4">
      <div className="px-4 lg:px-8">
        <WrittingSample analyzedSample={analyzedSample} />
      </div>
      <div
        className={cn(
          sampleAnalysisDone
            ? 'mx-auto block grid max-w-2xl grid-cols-3 gap-4 px-4 py-4 lg:px-16'
            : 'hidden',
        )}
      >
        {generateOptions.map((option) => (
          <Button
            key={option.event}
            className="cursor-pointer rounded-md border bg-muted p-4 text-center hover:animate-none hover:bg-primary hover:text-white"
            onClick={async () => {
              await handleBlogPostGenerator({
                userId,
                idea: TOPIC_ONE,
              });
              await analyzedSample();
            }}
          >
            {option.label}
          </Button>
        ))}
      </div>
      {learnMessages
        .filter(
          (message, index, self) =>
            index == self.findIndex((m) => m.id === message.id),
        )
        .map((message, index) => (
          <div key={index} className="mx-auto">
            <ChatMessage message={message} />

            {index < learnMessages.length - 1 && (
              <Separator className="my-4 md:my-8" />
            )}
          </div>
        ))}
    </div>
  );
}
