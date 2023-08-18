'use client';
import { useAuth } from '@clerk/nextjs';
import { useCallback, useEffect } from 'react';
import { Avatar, cn, Separator } from 'ui';

import { getUserWrittingRedis } from '@/lib/handleInngest';

import { Logomark } from '../logo';
import { MemoizedReactMarkdown } from '../markdown';

export interface ChatMessageProps {
  message: {
    role: 'user' | 'bot';
    content: string;
  };
}

export interface ChatList {
  messages: {
    role: 'user' | 'bot';
    content: string;
  }[];
}

type ResponseRedis = {
  status: 'pending' | 'completed';
  blogPost: string;
};

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

export function ChatList({ messages }: ChatList) {
  const { userId } = useAuth();

  const analysizedSample = useCallback(async () => {
    let response: ResponseRedis;
    do {
      const res = await getUserWrittingRedis(userId);
      if (res.status === 'completed') {
        response = res;
      }
    } while (response.status !== 'completed');

    messages.push({
      role: 'bot',
      content: response.blogPost,
    });
  }, [messages, userId]);

  useEffect(() => {
    analysizedSample();
  }, [analysizedSample]);

  return (
    <div className="relative mx-auto max-w-2xl px-4">
      {messages.map((message, index) => (
        <div key={index}>
          <ChatMessage message={message} />

          {index < messages.length - 1 && (
            <Separator className="my-4 md:my-8" />
          )}
        </div>
      ))}
    </div>
  );
}
