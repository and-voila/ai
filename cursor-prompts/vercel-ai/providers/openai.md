---
title: OpenAI
---

import { Steps, Callout } from 'nextra-theme-docs'

# OpenAI

Vercel AI SDK provides a set of utilities to make it easy to use OpenAI's API. In this guide, we'll walk through how to use the utilities to create a chat bot and a text completion app.

## Guide: Chat Bot

<Steps>

### Create a Next.js app

Create a Next.js application and install `ai` and `openai`, the Vercel AI SDK and OpenAI API client respectively:

```sh
pnpm dlx create-next-app my-ai-app
cd my-ai-app
pnpm install ai openai
```

### Add your OpenAI API Key to `.env`

Create a `.env` file in your project root and add your OpenAI API Key:

```env filename=".env"
OPENAI_API_KEY=xxxxxxxxx
```

### Create a Route Handler

Create a Next.js Route Handler that uses the Edge Runtime that we'll use to generate a chat completion via OpenAI that we'll then stream back to our Next.js.

For this example, we'll create a route handler at `app/api/chat/route.ts` that accepts a `POST` request with a `messages` array of strings:

```tsx filename="app/api/chat/route.ts" showLineNumbers
import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages } = await req.json();

  // Ask OpenAI for a streaming chat completion given the prompt
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages,
  });
  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);
  // Respond with the stream
  return new StreamingTextResponse(stream);
}
```

<Callout>
  Vercel AI SDK provides 2 utility helpers to make the above seamless: First, we
  pass the streaming `response` we receive from OpenAI to
  [`OpenAIStream`](/docs/api-reference/openai-stream). This method
  decodes/extracts the text tokens in the response and then re-encodes them
  properly for simple consumption. We can then pass that new stream directly to
  [`StreamingTextResponse`](/docs/api-reference/streaming-text-response). This
  is another utility class that extends the normal Node/Edge Runtime `Response`
  class with the default headers you probably want (hint: `'Content-Type':
  'text/plain; charset=utf-8'` is already set for you).
</Callout>

### Wire up the UI

Create a Client component with a form that we'll use to gather the prompt from the user and then stream back the completion from.
By default, the [`useChat`](/docs/api-reference/use-chat) hook will use the `POST` Route Handler we created above (it defaults to `/api/chat`). You can override this by passing a `api` prop to `useChat({ api: '...'})`.

```tsx filename="app/page.tsx" showLineNumbers
'use client';

import { useChat } from 'ai/react';

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="stretch mx-auto flex w-full max-w-md flex-col py-24">
      {messages.map((m) => (
        <div key={m.id}>
          {m.role === 'user' ? 'User: ' : 'AI: '}
          {m.content}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <label>
          Say something...
          <input
            className="fixed bottom-0 mb-8 w-full max-w-md rounded border border-gray-300 p-2 shadow-xl"
            value={input}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
```

</Steps>

## Guide: Text Completion

<Steps>

### Use the Completion API

Similar to the Chat Bot example above, we'll create a Next.js Route Handler that generates a text completion via OpenAI that we'll then stream back to our Next.js. It accepts a `POST` request with a `prompt` string:

```tsx filename="app/api/completion/route.ts" showLineNumbers
import OpenAI from 'openai';
import { OpenAIStream, StreamingTextResponse } from 'ai';

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge';

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { prompt } = await req.json();

  // Ask OpenAI for a streaming completion given the prompt
  const response = await openai.completions.create({
    model: 'text-davinci-003',
    stream: true,
    prompt,
  });

  // Check for errors
  if (!response.ok) {
    return new Response(await response.text(), {
      status: response.status,
    });
  }

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
```

### Wire up the UI

We can use the [`useCompletion`](/docs/api-reference/use-completion) hook to make it easy to wire up the UI. By default, the `useCompletion` hook will use the `POST` Route Handler we created above (it defaults to `/api/completion`). You can override this by passing a `api` prop to `useCompletion({ api: '...'})`.

```tsx filename="app/page.tsx" showLineNumbers
'use client';

import { useCompletion } from 'ai/react';

export default function Completion() {
  const {
    completion,
    input,
    stop,
    isLoading,
    handleInputChange,
    handleSubmit,
  } = useCompletion({
    api: '/api/completion',
  });

  return (
    <div className="stretch mx-auto flex w-full max-w-md flex-col py-24">
      <form onSubmit={handleSubmit}>
        <label>
          Say something...
          <input
            className="fixed bottom-0 mb-8 w-full max-w-md rounded border border-gray-300 p-2 shadow-xl"
            value={input}
            onChange={handleInputChange}
          />
        </label>
        <output>Completion result: {completion}</output>
        <button type="button" onClick={stop}>
          Stop
        </button>
        <button disabled={isLoading} type="submit">
          Send
        </button>
      </form>
    </div>
  );
}
```

</Steps>

## Guide: Save to Database After Completion

It’s common to want to save the result of a completion to a database after streaming it back to the user. The `OpenAIStream` adapter accepts a couple of optional callbacks that can be used to do this.

```tsx filename="app/api/completion/route.ts" showLineNumbers
export async function POST(req: Request) {
  // ...

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response, {
    onStart: async () => {
      // This callback is called when the stream starts
      // You can use this to save the prompt to your database
      await savePromptToDatabase(prompt);
    },
    onToken: async (token: string) => {
      // This callback is called for each token in the stream
      // You can use this to debug the stream or save the tokens to your database
      console.log(token);
    },
    onCompletion: async (completion: string) => {
      // This callback is called when the stream completes
      // You can use this to save the final completion to your database
      await saveCompletionToDatabase(completion);
    },
  });

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
```

## Guide: Use with Azure OpenAI Service

You can pass custom options to the `Configuration` from the OpenAI package to connect to the an Azure instance.
See the [OpenAI client repository](https://github.com/openai/openai-node/blob/v4/examples/azure.ts) for a more complete example.

```tsx filename="app/api/completion/route.ts"
import OpenAI from 'openai';

const resource = '<your resource name>';
const model = '<your model>';

const apiKey = process.env.AZURE_OPENAI_API_KEY;
if (!apiKey) {
  throw new Error('AZURE_OPENAI_API_KEY is missing from the environment.');
}

// Azure OpenAI requires a custom baseURL, api-version query param, and api-key header.
const openai = new OpenAI({
  apiKey,
  baseURL: `https://${resource}.openai.azure.com/openai/deployments/${model}`,
  defaultQuery: { 'api-version': '2023-06-01-preview' },
  defaultHeaders: { 'api-key': apiKey },
});
```

<Callout>
  Note: Before the release of `openai@4`, we previously recommended using the
  `openai-edge` library because of it's compatibility with Vercel Edge Runtime.
  The OpenAI SDK now supports Edge Runtime out of the box, so we recommend using
  the official `openai` library instead.
</Callout>
