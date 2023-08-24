---
title: Using Vercel AI SDK with Next JS App Router
---

# Next.js App Router

The Vercel AI SDK has been built with [Next.js App Router](https://nextjs.org/docs/app) support in mind.

## Route Handlers

Using a [Route Handler](https://nextjs.org/docs/app/building-your-application/routing/router-handlers)
for your API requests is the recommended way to use the Vercel AI SDK with Next.js.

Below is a minimal route handler for using the OpenAI Chat API with the `openai` API client and the Vercel AI SDK. Consult our [guides](/docs/guides) for examples of using other providers.

```typescript
// app/api/chat/route.ts

import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

// Optional, but recommended: run on the edge runtime.
// See https://vercel.com/docs/concepts/functions/edge-functions
export const runtime = 'edge';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages } = await req.json();

  // Request the OpenAI API for the response based on the prompt
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: messages,
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
```

Note that using the Edge Runtime is optional but highly recommended due to [longer streaming timeouts on Vercel](https://vercel.com/docs/concepts/functions/edge-functions/limitations#maximum-initial-response-time), no cold starts, and lower latency.

## In Server Components

The Route Handler code can be adapted to work with [Server Components](https://nextjs.org/docs/getting-started/react-essentials#server-components), but additional work needs to be done to render the stream as it comes in. The provided example is a proof-of-concept.

```typescript
// app/page.tsx
import OpenAI from 'openai';
import { OpenAIStream } from 'ai';
import { Suspense } from 'react';

// Optional, but recommended: run on the edge runtime.
// See https://vercel.com/docs/concepts/functions/edge-functions
export const runtime = 'edge';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export default async function Page({
  searchParams,
}: {
  // note that using searchParams opts your page into dynamic rendering. See https://nextjs.org/docs/app/api-reference/file-conventions/page#searchparams-optional
  searchParams: Record<string, string>;
}) {
  // Request the OpenAI API for the response based on the prompt
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    stream: true,
    messages: [
      {
        role: 'user',
        content:
          searchParams['prompt'] ?? 'Give me code for generating a JSX button',
      },
    ],
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);

  const reader = stream.getReader();

  // We recursively render the stream as it comes in
  return (
    <Suspense>
      <Reader reader={reader} />
    </Suspense>
  );
}

async function Reader({
  reader,
}: {
  reader: ReadableStreamDefaultReader<any>;
}) {
  const { done, value } = await reader.read();

  if (done) {
    return null;
  }

  const text = new TextDecoder().decode(value);

  return (
    <span>
      {text}
      <Suspense>
        <Reader reader={reader} />
      </Suspense>
    </span>
  );
}
```

## In Client Components

You can use the SDK's [`useChat`](/docs/api-reference/use-chat) and [`useCompletion`](/docs/api-reference/use-completion) hooks inside of Client Components.
However, you cannot set a routes runtime from them, so if you want to opt-in to the Edge runtime you should create a wrapper React Server Component like so:

```typescript
// app/page.tsx -- server component

import Chat from './chat';

export const runtime = 'edge';

export default function Page() {
  return <Chat />;
}
```

```typescript
// app/chat.tsx -- client component
'use client';

import { useChat } from 'ai/react';

export default function MyComponent() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/chat',
  });

  return (
    <div>
      <ul>
        {messages.map((m, index) => (
          <li key={index}>
            {m.role === 'user' ? 'User: ' : 'AI: '}
            {m.content}
          </li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <label>
          Say something...
          <input value={input} onChange={handleInputChange} />
        </label>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
```
