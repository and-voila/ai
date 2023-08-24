'use client';
import { Message, nanoid } from 'ai';
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
  const [learnMessages, setLearnMessages] = useState<Message[]>([
    {
      content: 'Welcome we will need 5 of your right samples',
      id: nanoid(),
      role: 'system',
      createdAt: new Date(),
      name: 'system',
    },
  ]);
  const [step, setStep] = useState(0);

  function renderStep() {
    switch (step) {
      case 0:
        return (
          <WritingSample
            setLearnMessages={setLearnMessages}
            setStep={setStep}
          />
        );
      case 1:
        return (
          <ConfirmComponent
            setLearnMessages={setLearnMessages}
            setStep={setStep}
          />
        );
      case 2:
        return <GenerateBlog setLearnMessages={setLearnMessages} />;
      default:
        break;
    }
  }

  return (
    <div className="relative mx-auto px-16">
      {learnMessages
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
        .map((message, index) => (
          <div key={index} className="mx-auto">
            <ChatMessage message={message} />

            {index < learnMessages.length - 1 && (
              <Separator className="my-4 md:my-8" />
            )}
          </div>
        ))}
      <div className="mb-54" />
      <div className="fixed bottom-0 w-3/4">{renderStep()}</div>
    </div>
  );
}
