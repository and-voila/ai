---
title: useCompletion
---

import { OptionTable } from '@/components/table'
import { FrameworkTabs, Tab } from '@/components/framework-tabs'

# useCompletion

## `useCompletion(options: UseCompletionOptions): CompletionHelpers` [#usecompletion]

`useCompletion` is a utility designed to handle text completion and the state of prompt inputs. This tool is useful when you need to integrate text completion capabilities into your application, with the UI updated automatically as new tokens are received from the API endpoint via streaming.

<FrameworkTabs>
  <Tab>
To use `useCompletion` in React projects, you can import it from the `ai/react` subpath. Here's an example demonstrating the use of `useCompletion` in a simple text completion interface:

```tsx filename="app/completion.tsx"
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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          value={input}
          placeholder="Enter your prompt..."
          onChange={handleInputChange}
        />
        <p>Completion result: {completion}</p>
        <button type="button" onClick={stop}>
          Stop
        </button>
        <button disabled={isLoading} type="submit">
          Submit
        </button>
      </form>
    </div>
  )
}
```

Depending on your code setup, you might want more granular control over the way the completion is executed. To achieve that, you can use the `complete` helper in the `useCompletion` hook, as well as the `onResponse` and `onFinish` options:

```tsx filename="app/completion.tsx"
'use client'

import { useCompletion } from 'ai/react'
import { useDebouncedCallback } from 'use-debounce'

export default function Completion() {
  const { complete, completion, isLoading } = useCompletion({
    api: '/api/completion',
    onResponse: res => {
      // trigger something when the response starts streaming in
      // e.g. if the user is rate limited, you can show a toast
      if (res.status === 429) {
        toast.error('You are being rate limited. Please try again later.')
      }
    },
    onFinish: () => {
      // do something with the completion result
      toast.success('Successfully generated completion!')
    }
  })

  const handleInputChange = useDebouncedCallback(e => {
    complete(e.target.value)
  }, 500)

  return (
    <div>
      <p>Current state: {isLoading ? 'Generating...' : 'Idle'}</p>
      <textarea
        placeholder="Enter your prompt..."
        onChange={handleInputChange}
      />
      <p>{completion}</p>
    </div>
  )
}
```

### `UseCompletionOptions`

<OptionTable
options={[
[
'api',
"string = '/api/completion'",
'The API endpoint that accepts a `{ prompt: string }` object and returns a stream of tokens for the AI completion response. Defaults to `/api/completion`.'
],
[
'id',
'string',
'An unique identifier for the completion. If not provided, a random one will be generated. When provided, the `useCompletion` hook with the same `id` will have shared states across components. This is useful when you have multiple components showing the same chat stream'
],
[
'initialInput',
"string = ''",
'An optional string for the initial prompt input.'
],
[
'initialCompletion',
"string = ''",
'An optional string for the initial completion result.'
],
[
'onResponse',
'(res: Response) => void',
'An optional callback function that is called with the response from the API endpoint. Useful for throwing customized errors or logging.'
],
[
'onFinish',
'(prompt: string, completion: string) => void',
'An optional callback function that is called when the completion stream ends.'
],
[
'onError',
'(err: Error) => void',
'An optional callback that will be called when the chat stream encounters an error'
],
[
'headers',
'Record<string, string> | Headers',
'An optional object of headers to be passed to the API endpoint.'
],
[
'body',
'any',
'An optional, additional body object to be passed to the API endpoint.'
],
[
'credentials',
'"omit" | "same-origin" | "include"',
'An optional literal that sets the mode of credentials to be used on the request. Defaults to "same-origin".'
]
]}
/>

### `UseCompletionHelpers`

The `useCompletion` hook returns an object with several helper methods and variables to manage the completion state:

<OptionTable
options={[
['completion', 'string', 'The current text completion.'],
[
'complete',
'(prompt: string) => void',
'Function to execute text completion based on the provided prompt.'
],
[
'error',
'undefined | Error',
'The error thrown during the completion process, if any.'
],
[
'setCompletion',
'(completion: string) => void',
'Function to update the `completion` state.'
],
['stop', '() => void', 'Function to abort the current API request.'],
['input', 'string', 'The current value of the input field.'],
[
'setInput',
'React.Dispatch<React.SetStateAction<string>>',
'Function to update the `input` value.'
],
[
'handleInputChange',
'(e: any) => void',
"Handler for the `onChange` event of the input field to control the input's value."
],
[
'handleSubmit',
'(e: React.FormEvent<HTMLFormElement>) => void',
'Form submission handler that automatically resets the input field and appends a user message.'
],
[
'isLoading',
'boolean',
'Boolean flag indicating whether a fetch operation is currently in progress.'
]
]}
/>

</Tab>
<Tab>

To use `useCompletion` in Svelte projects, you can import it from the `ai/svelte` subpath. Here's an example demonstrating the use of `useCompletion` in a simple text completion interface:

```tsx filename="routes/+page.svelte" {4}
<script>
  import { useCompletion } from 'ai/svelte'

  const { input, handleSubmit, completion } = useCompletion()
</script>

<div>
  <p>Completion result: {$completion}</p>
  <form on:submit={handleSubmit}>
    <input bind:value={$input} />
    <button type="submit">Send</button>
  </form>
</div>
```

### `UseCompletionOptions`

<OptionTable
options={[
[
'api',
"string = '/api/completion'",
'The API endpoint that accepts a `{ prompt: string }` object and returns a stream of tokens for the AI completion response. Defaults to `/api/completion`.'
],
[
'id',
'string',
'An unique identifier for the completion. If not provided, a random one will be generated. When provided, the `useCompletion` function with the same `id` will have shared states across components. This is useful when you have multiple components showing the same chat stream.'
],
[
'initialInput',
"string = ''",
'An optional string for the initial prompt input.'
],
[
'initialCompletion',
"string = ''",
'An optional string for the initial completion result.'
],
[
'onResponse',
'(res: Response) => void',
'An optional callback function that is called with the response from the API endpoint. Useful for throwing customized errors or logging.'
],
[
'onFinish',
'(prompt: string, completion: string) => void',
'An optional callback function that is called when the completion stream ends.'
],
[
'onError',
'(err: Error) => void',
'An optional callback that will be called when the chat stream encounters an error'
],
[
'headers',
'Record<string, string> | Headers',
'An optional object of headers to be passed to the API endpoint.'
],
[
'body',
'any',
'An optional, additional body object to be passed to the API endpoint.'
],
[
'credentials',
'"omit" | "same-origin" | "include"',
'An optional literal that sets the mode of credentials to be used on the request. Defaults to "same-origin".'
]
]}
/>

### `UseCompletionHelpers`

The `useCompletion` function returns an object with several helper methods and variables to manage the completion state:

<OptionTable
options={[
[
'completion',
'Readable<string>',
'A Svelte readable store of the current text completion.'
],
[
'complete',
'(prompt: string) => Promise<string | undefined>',
'Function to execute text completion based on the provided prompt. Returns a promise that resolves to the completion result, or throws an error if the request fails.'
],
[
'error',
'Readable<undefined | Error>',
'The error thrown during the completion process, if any.'
],
[
'setCompletion',
'(completion: string) => void',
'Function to update the `completion` state locally.'
],
['stop', '() => void', 'Function to abort the current API request.'],
[
'input',
'Writable<string>',
'A Svelte writable store that represents the current value of the input field.'
],
[
'handleSubmit',
'(e: React.FormEvent<HTMLFormElement>) => void',
'Form submission handler that automatically resets the input field and appends a user message.'
],
[
'isLoading',
'boolean',
'Boolean flag indicating whether a fetch operation is currently in progress.'
]
]}
/>

</Tab>
<Tab>
To use `useCompletion` in Vue projects, you can import it from the `ai/vue` subpath. Here's an example demonstrating the use of `useCompletion` in a simple text completion interface:

```tsx filename="pages/app.vue"
<script setup>
  import { useCompletion } from 'ai/vue'

  const { input, handleSubmit, completion } = useCompletion()
</script>

<template>
  <div>
    <p>Completion result: {{ completion }}</p>
    <form @submit.prevent={handleSubmit}>
      <label for="input">Prompt</label>
      <input v-model={input} id="input" />
      <button type="submit">Send</button>
    </form>
  </div>
</template>
```

### `UseCompletionOptions`

<OptionTable
options={[
[
'api',
"string = '/api/completion'",
'The API endpoint that accepts a `{ prompt: string }` object and returns a stream of tokens for the AI completion response. Defaults to `/api/completion`.'
],
[
'id',
'string',
'An unique identifier for the completion. If not provided, a random one will be generated. When provided, the `useCompletion` function with the same `id` will have shared states across components. This is useful when you have multiple components showing the same chat stream.'
],
[
'initialInput',
"string = ''",
'An optional string for the initial prompt input.'
],
[
'initialCompletion',
"string = ''",
'An optional string for the initial completion result.'
],
[
'onResponse',
'(res: Response) => void',
'An optional callback function that is called with the response from the API endpoint. Useful for throwing customized errors or logging.'
],
[
'onFinish',
'(prompt: string, completion: string) => void',
'An optional callback function that is called when the completion stream ends.'
],
[
'onError',
'(err: Error) => void',
'An optional callback that will be called when the chat stream encounters an error'
],
[
'headers',
'Record<string, string> | Headers',
'An optional object of headers to be passed to the API endpoint.'
],
[
'body',
'any',
'An optional, additional body object to be passed to the API endpoint.'
]
]}
/>

### `UseCompletionHelpers`

The `useCompletion` function returns an object with several helper methods and variables to manage the completion state:

<OptionTable
options={[
[
'completion',
'Ref<string>',
'A Vue ref wrapping the current text completion.'
],
[
'complete',
'(prompt: string) => Promise<string | null | undefined>',
'Send a new prompt to the API endpoint and update the completion state.'
],
[
'error',
'Ref<undefined | Error>',
'The error thrown during the completion process, if any.'
],
[
'setCompletion',
'(completion: string) => void',
'Function to update the `completion` state locally.'
],
['stop', '() => void', 'Function to abort the current API request.'],
[
'input',
'Ref<string>',
'A Vue ref wrapping the current value of the input field.'
],
[
'handleSubmit',
'(e: any) => void',
'Form submission handler that automatically resets the input field and appends a user message.'
],
[
'isLoading',
'boolean',
'Boolean flag indicating whether a fetch operation is currently in progress.'
]
]}
/>
</Tab>
</FrameworkTabs>

## Example: Building a Spell Check

Here is an example of how to use `useCompletion` to build a simple blog post spell checker that reports typos via the requested structured output.

```tsx
// app/page.tsx
'use client'

import { useCompletion } from 'ai/react'
import { useState, useCallback } from 'react'

export default function PostEditorPage() {
  // Locally store our blog posts content
  const [content, setContent] = useState('')
  const { complete } = useCompletion({
    api: '/api/completion'
  })

  const checkAndPublish = useCallback(
    async (c: string) => {
      const completion = await complete(c)
      if (!completion) throw new Error('Failed to check typos')
      const typos = JSON.parse(completion)
      // you should more validation here to make sure the response is valid
      if (typos?.length && !window.confirm('Typos found… continue?')) return
      else alert('Post published')
    },
    [complete]
  )

  return (
    <div>
      <h1>Post Editor</h1>
      <textarea value={content} onChange={e => setContent(e.target.value)} />
      <button onClick={() => checkAndPublish(content)}>Publish</button>
    </div>
  )
}
```

In the code snippet above, we define a React component `PostEditor` that utilizes
a custom prompt and the [`complete`](docs/api-reference/use-completion#usecompletionhelpers) function to request a JSON string from an AI model.

The server API formats the prompt for the AI model, and then it uses the [OpenAIStream](/docs/api-reference/openai-stream) and [StreamingTextResponse](/docs/api-reference/streaming-text-response) utilities to stream the response back to the client.

```tsx
// app/api/completion/route.ts

import OpenAI from 'openai'
import { OpenAIStream, StreamingTextResponse } from 'ai'

export const runtime = 'edge'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!
})

export async function POST(req: Request) {
  // Extract the `prompt` from the body of the request
  const { prompt } = await req.json()

  // Request the OpenAI API for the response based on the prompt
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    // a precise prompt is important for the AI to reply with the correct tokens
    messages: [
      {
        role: 'user',
        content: `Given the following post content, detect if it has typo or not.
Respond with a JSON array of typos ["typo1", "typo2", ...] or an empty [] if there's none. Only respond with an array. Post content:
${prompt}

Output:\n`
      }
    ],
    max_tokens: 200,
    temperature: 0, // you want absolute certainty for spell check
    top_p: 1,
    frequency_penalty: 1,
    presence_penalty: 1
  })

  const stream = OpenAIStream(response)

  return new StreamingTextResponse(stream)
}
```
