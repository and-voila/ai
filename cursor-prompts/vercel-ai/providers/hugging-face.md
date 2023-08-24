---
title: Hugging Face
---

# Hugging Face

import { Steps, Callout } from 'nextra-theme-docs'

Vercel AI SDK provides a set of utilities to make it easy to use Hugging Face's APIs. In this guide, we'll walk through how to use the utilities to create a chat bot and a text completion app. Hugging Face offers two API services:

- **Free Inference API:** Use over 100k+ models out of the box. Ideal for quick exploration of models.
- **Inference Endpoints:** Production-ready service with autoscaling, dedicated infra and flexibility.

## Guide: Chat Bot

<Steps>

### Create a Next.js app

Create a Next.js application and install `ai` and `@huggingface/inference`:

```sh
pnpm dlx create-next-app my-ai-app
cd my-ai-app
pnpm install ai @huggingface/inference
```

### Add your Hugging Face API Key to `.env`

Create a `.env` file in your project root and add your Hugging Face token (generate one [here](https://huggingface.co/settings/tokens)):

```env filename=".env"
HUGGINGFACE_API_KEY=xxxxxxxxx
```

### Create a Route Handler

Create a Next.js Route Handler that uses the Edge Runtime and the `OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5` model to generate a response to a series of messages via the Hugging Face API, and returns the response as a streaming text response.

For this example, we'll create a route handler at `app/api/chat/route.ts` that accepts a `POST` request with a `messages` array of strings:

```tsx filename="app/api/chat/route.ts" showLineNumbers
import { HfInference } from '@huggingface/inference'
import { HuggingFaceStream, StreamingTextResponse } from 'ai'
import { experimental_buildOpenAssistantPrompt } from 'ai/prompts'

// Create a new Hugging Face Inference instance
const Hf = new HfInference(process.env.HUGGINGFACE_API_KEY)

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge'

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages } = await req.json()

  // Initialize a text-generation stream using the Hugging Face Inference SDK
  const response = await Hf.textGenerationStream({
    model: 'OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5',
    inputs: experimental_buildOpenAssistantPrompt(messages),
    parameters: {
      max_new_tokens: 200,
      // @ts-ignore (this is a valid parameter specifically in OpenAssistant models)
      typical_p: 0.2,
      repetition_penalty: 1,
      truncate: 1000,
      return_full_text: false
    }
  })

  // Check for errors
  if (!response.ok) {
    return new Response(await response.text(), {
      status: response.status
    })
  }

  // Convert the async generator into a friendly text-stream
  const stream = HuggingFaceStream(response)

  // Respond with the stream, enabling the client to consume the response
  return new StreamingTextResponse(stream)
}
```

<Callout>
  Vercel AI SDK provides 2 utility helpers to make the above seamless: First, we
  pass the streaming `response` we receive from `Hf.textGenerationStream` to
  [`HuggingFaceStream`](/docs/api-reference/huggingface-stream). This method
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
'use client'

import { useChat } from 'ai/react'

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat()

  return (
    <div className="mx-auto w-full max-w-md py-24 flex flex-col stretch">
      {messages.map(m => (
        <div key={m.id}>
          {m.role === 'user' ? 'User: ' : 'AI: '}
          {m.content}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <label>
          Say something...
          <input
            className="fixed w-full max-w-md bottom-0 border border-gray-300 rounded mb-8 shadow-xl p-2"
            value={input}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Send</button>
      </form>
    </div>
  )
}
```

</Steps>

## Guide: Text Completion

<Steps>

### Use the Completion API

Similar to the Chat Bot example above, we'll create a Next.js Route Handler that generates a text completion via the same Hugging Face API that we'll then stream back to our Next.js. It accepts a `POST` request with a `prompt` string:

```tsx filename="app/api/completion/route.ts" showLineNumbers
import { HfInference } from '@huggingface/inference'
import { HuggingFaceStream, StreamingTextResponse } from 'ai'

// Create a new Hugging Face Inference instance
const Hf = new HfInference(process.env.HUGGINGFACE_API_KEY)

// IMPORTANT! Set the runtime to edge
export const runtime = 'edge'

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { prompt } = await req.json()

  const response = await Hf.textGenerationStream({
    model: 'OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5',
    inputs: `<|prompter|>${prompt}<|endoftext|><|assistant|>`,
    parameters: {
      max_new_tokens: 200,
      // @ts-ignore (this is a valid parameter specifically in OpenAssistant models)
      typical_p: 0.2,
      repetition_penalty: 1,
      truncate: 1000,
      return_full_text: false
    }
  })

  // Convert the response into a friendly text-stream
  const stream = HuggingFaceStream(response)

  // Respond with the stream
  return new StreamingTextResponse(stream)
}
```

### Wire up the UI

We can use the [`useCompletion`](/docs/api-reference/use-completion) hook to make it easy to wire up the UI. By default, the `useCompletion` hook will use the `POST` Route Handler we created above (it defaults to `/api/completion`). You can override this by passing a `api` prop to `useCompletion({ api: '...'})`.

```tsx filename="app/page.tsx" showLineNumbers
'use client'

import { useCompletion } from 'ai/react'

export default function Completion() {
  const {
    completion,
    input,
    stop,
    isLoading,
    handleInputChange,
    handleSubmit
  } = useCompletion({
    api: '/api/completion'
  })

  return (
    <div className="mx-auto w-full max-w-md py-24 flex flex-col stretch">
      <form onSubmit={handleSubmit}>
        <label>
          Say something...
          <input
            className="fixed w-full max-w-md bottom-0 border border-gray-300 rounded mb-8 shadow-xl p-2"
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
  )
}
```

</Steps>

## Guide: Using Production-ready Inference Endpoints

[Inference Endpoints](https://huggingface.co/inference-endpoints) offer a secure solution to deploy models from the Hub on dedicated and autoscaling infrastructure.
`@huggingface/inference` also works with Inference Endpoints, making it very easy to switch between the two API services. The only change needed is how you create your inference instance.

```tsx filename="app/api/completion/route.ts" showLineNumbers
import { HfInferenceEndpoint } from '@huggingface/inference'

// Create a new Hugging Face Inference instance
const endpointUrl = 'https://YOUR_ENDPOINT.endpoints.huggingface.cloud/gpt2'
const Hf = new HfInferenceEndpoint(endpointUrl, process.env.HUGGINGFACE_API_KEY)

// Rest of the code stays the same
```

## Guide: Save to Database After Completion

It’s common to want to save the result of a completion to a database after streaming it back to the user. The `HuggingFaceStream` adapter accepts a couple of optional callbacks that can be used to do this.

```tsx filename="app/api/completion/route.ts" showLineNumbers
export async function POST(req: Request) {
  // ...

  // Convert the response into a friendly text-stream
  const stream = HuggingFaceStream(response, {
    onStart: async () => {
      // This callback is called when the stream starts
      // You can use this to save the prompt to your database
      await savePromptToDatabase(prompt)
    },
    onToken: async (token: string) => {
      // This callback is called for each token in the stream
      // You can use this to debug the stream or save the tokens to your database
      console.log(token)
    },
    onCompletion: async (completion: string) => {
      // This callback is called when the stream completes
      // You can use this to save the final completion to your database
      await saveCompletionToDatabase(completion)
    }
  })

  // Respond with the stream
  return new StreamingTextResponse(stream)
}
```
