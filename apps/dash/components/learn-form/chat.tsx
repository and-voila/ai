'use client';
import { nanoid } from 'ai';
import { type Message, useChat } from 'ai/react';
import { useState } from 'react';
import { Avatar, cn, Separator } from 'ui';

import { Logomark } from '../logo';
import { MemoizedReactMarkdown } from '../markdown';
import ConfirmComponent from './confirm';
import GenerateBlog from './generate-blog';
import { WritingSample } from './writing-sample';

export interface ChatMessageProps {
  message: Message;
  loading?: boolean;
}

export interface ChatList {
  messages: {
    role: 'user' | 'system' | 'assistant';
    content: string;
  }[];
}

export function ChatMessage({ message, ...props }: ChatMessageProps) {
  return (
    <div className={cn('flex')} {...props}>
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

export function ChatList() {
  const [learnMessages] = useState<Message[]>([
    {
      content:
        'To start, we need 4 unique writing samples (min 500 words each). Paste them in the chat input below.',
      id: nanoid(),
      role: 'system',
      createdAt: new Date(),
      name: 'system',
    },
  ]);
  const { messages, append, isLoading } = useChat({
    initialMessages: learnMessages,
  });
  const [step, setStep] = useState(0);

  function renderStep() {
    switch (step) {
      case 0:
        return <WritingSample setStep={setStep} />;
      case 1:
        return (
          <ConfirmComponent
            append={append}
            setStep={setStep}
            isLoading={isLoading}
          />
        );
      case 2:
        return <GenerateBlog append={append} isLoading={isLoading} />;
      default:
        break;
    }
  }

  return (
    <div className="relative mx-auto">
      <div className="mb-54 !max-h-90 pb-[200px] pt-4">
        {messages
          .sort((a, b) => {
            if (!a.createdAt || !b.createdAt) {
              return 0;
            }
            return (
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            );
          })
          .filter(
            (message, index, self) =>
              index == self.findIndex((m) => m.id === message.id),
          )
          .filter((message) => message.role !== 'user')
          .map((message, index) => (
            <div key={index} className="mx-auto">
              <ChatMessage message={message} />
              <Separator className="my-4 md:my-8" />
            </div>
          ))}
        {isLoading && (
          <ChatMessage
            message={{
              content: '▍',
              id: nanoid(),
              role: 'system',
              createdAt: new Date(),
              name: 'system',
            }}
          />
        )}
      </div>

      <div className="fixed bottom-0 w-3/4">{renderStep()}</div>
    </div>
  );
}
