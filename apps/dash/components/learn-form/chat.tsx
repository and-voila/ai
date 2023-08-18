import { Avatar, cn, Separator } from 'ui';

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
  if (!messages.length) {
    return null;
  }

  return (
    <div className="px-4 lg:px-8">
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
