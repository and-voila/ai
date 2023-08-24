---
title: useChat
layout:
  toc: false
---

import { OptionTable } from '@/components/table'
import { FrameworkTabs, Tab } from '@/components/framework-tabs'

# useChat

## `useChat(options: UseChatOptions): ChatHelpers` [#usechat]

`useChat` is a utility to allow you to easily create a conversational user interface for your chatbot application. It enables the **streaming** of chat messages from your AI provider, manages the state for chat input, and updates the UI automatically as new messages are received.

<FrameworkTabs>
  <Tab>
To use `useChat` in React projects, you can import it from the `ai/react` subpath. Below is a usage example demonstrating a basic chat interface:

```tsx filename="app/chat.tsx" {6}
'use client'

import { useChat } from 'ai/react'

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat()

  return (
    <div>
      {messages.map(m => (
        <div key={m.id}>
          {m.role === 'user' ? 'User: ' : 'AI: '}
          {m.content}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <label>
          Say something...
          <input value={input} onChange={handleInputChange} />
        </label>
        <button type="submit">Send</button>
      </form>
    </div>
  )
}
```

After submitting a message, the `useChat` hook will automatically append a user message to the chat history and trigger an API call to the configured endpoint. The response will be streamed to the chat history and returned by the hook as `messages`. Whenever a new chunk of streamed messages is received, the hook will automatically update the `messages` state and trigger a re-render.

This enables a seamless chat experience where the user can see the AI response as soon as it is available, without having to wait for the entire response to be received.

### `UseChatOptions` [#use-chat-options]

Options passed to `useChat`:

<OptionTable
options={[
[
'api',
"string = '/api/chat'",
'The API endpoint that accepts a `{ messages: Message[] }` object and returns a stream of tokens of the AI chat response. Defaults to `/api/chat`.'
],
[
'id',
'string',
'An unique identifier for the chat. If not provided, a random one will be generated. When provided, the `useChat` hook with the same `id` will have shared states across components. This is useful when you have multiple components showing the same chat stream'
],
[
'initialInput',
"string = ''",
'An optional string of initial prompt input'
],
[
'initialMessages',
'Messages[] = []',
'An optional array of initial chat messages'
],
[
'onResponse',
'(res: Response) => void',
'An optional callback that will be called with the response from the API endpoint. Useful for throwing customized errors or logging'
],
[
'onFinish',
'(message: Message) => void',
'An optional callback that will be called when the chat stream ends'
],
[
'onError',
'(err: Error) => void',
'An optional callback that will be called when the chat stream encounters an error'
],
[
'headers',
'Record<string, string> | Headers',
'An optional object of headers to be passed to the API endpoint'
],
[
'body',
'any',
'An optional, extra body object to be passed to the API endpoint in addition to the `messages` array'
],
[
'credentials',
'"omit" | "same-origin" | "include"',
'An optional literal that sets the mode of credentials to be used on the request. Defaults to "same-origin".'
]
]}
/>

### `ChatHelpers` [#chat-helpers]

The `useChat` hook returns an object containing several helper methods and variables to manage the chat state:

<OptionTable
options={[
['messages', 'Message[]', 'The current array of chat messages.'],
['error', 'Error | undefined', 'An error object returned by SWR, if any.'],
[
'append',
'(message: Message | CreateMessage) => Promise<string | undefined>',
'Function to append a message to the chat, triggering an API call for the AI response. It returns a promise that resolves to full response message content when the API call is successfully finished, or throws an error when the API call fails.'
],
[
'reload',
'() => Promise<string | undefined>',
"Function to reload the last AI chat response for the given chat history. If the last message isn't from the assistant, it will request the API to generate a new response."
],
['stop', '() => void', 'Function to abort the current API request.'],
[
'setMessages',
'(messages: Message[]) => void',
'Function to update the `messages` state locally without triggering an API call.'
],
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
'Boolean flag indicating whether a request is currently in progress.'
],
['data', 'JSONValue[]', 'Data returned from experimental_StreamData']
]}
/>

  </Tab>
  <Tab>
To use `useChat` in Svelte projects, you can import it from the `ai/svelte` subpath. Below is a usage example demonstrating a basic chat interface:

```tsx filename="routes/+page.svelte" {4}
<script>
  import { useChat } from 'ai/svelte'

  const { input, handleSubmit, messages } = useChat()
</script>

<div>
  <ul>
    {#each $messages as message}
      <li>{message.role}: {message.content}</li>
    {/each}
  </ul>
  <form on:submit={handleSubmit}>
    <input bind:value={$input} />
    <button type="submit">Send</button>
  </form>
</div>
```

After submitting a message, `useChat` will automatically append a user message to the chat history and trigger an API call to the configured endpoint. The response will be streamed to the chat history and returned by the function as a Svelte readable store `messages`. Whenever a new chunk of streamed messages is received, it will update the UI to reflect the new messages.

This enables a seamless chat experience where the user can see the AI response as soon as it is available, without having to wait for the entire response to be received.

### `UseChatOptions` [#use-chat-options]

Options passed to `useChat`:

<OptionTable
options={[
[
'api',
"string = '/api/chat'",
'The API endpoint that accepts a `{ messages: Message[] }` object and returns a stream of tokens of the AI chat response. Defaults to `/api/chat`.'
],
[
'id',
'string',
'An unique identifier for the chat. If not provided, a random one will be generated. When provided, the `useChat` hook with the same `id` will have shared states across components. This is useful when you have multiple components showing the same chat stream'
],
[
'initialInput',
"string = ''",
'An optional string of initial prompt input'
],
[
'initialMessages',
'Messages[] = []',
'An optional array of initial chat messages'
],
[
'onResponse',
'(res: Response) => void',
'An optional callback that will be called with the response from the API endpoint. Useful for throwing customized errors or logging'
],
[
'onFinish',
'(message: Message) => void',
'An optional callback that will be called when the chat stream ends'
],
[
'onError',
'(err: Error) => void',
'An optional callback that will be called when the chat stream encounters an error'
],
[
'headers',
'Record<string, string> | Headers',
'An optional object of headers to be passed to the API endpoint'
],
[
'body',
'any',
'An optional, extra body object to be passed to the API endpoint in addition to the `messages` array'
],
[
'credentials',
'"omit" | "same-origin" | "include"',
'An optional literal that sets the mode of credentials to be used on the request. Defaults to "same-origin".'
]
]}
/>

### `ChatHelpers` [#chat-helpers]

The `useChat` function returns an object containing several helper methods and variables to manage the chat state:

<OptionTable
options={[
[
'messages',
'Readable<Message[]>',
'A Svelte readable store with an array of chat messages. The store will be updated whenever a new chunk of messages is received.'
],
[
'error',
'Readable<Error | undefined>',
'The error thrown during the request, if any.'
],
[
'append',
'(message: Message | CreateMessage) => Promise<string | undefined>',
'Function to append a message to the chat, triggering an API call for the AI response. It returns a promise that resolves to full response message content when the API call is successfully finished, or throws an error when the API call fails.'
],
[
'reload',
'() => Promise<string | undefined>',
"Function to reload the last AI chat response for the given chat history. If the last message isn't from the assistant, it will request the API to generate a new response."
],
['stop', '() => void', 'Function to abort the current API request.'],
[
'setMessages',
'(messages: Message[]) => void',
'Function to locally update the `messages` state locally without triggering an API call.'
],
[
'input',
'Writable<string>',
'A Svelte writable store to keep the current value of the input field.'
],
[
'handleSubmit',
'(e: React.FormEvent<HTMLFormElement>) => void',
'Form submission handler that automatically resets the input field and appends a user message.'
],
[
'isLoading',
'boolean',
'Boolean flag indicating whether a request is currently in progress.'
]
]}
/>

  </Tab>
  <Tab>
To use `useChat` in Vue.js projects, you can import it from the `ai/vue` subpath. Below is a usage example demonstrating a basic chat interface:
  
```vue filename="app.vue"
<script setup>
import { useChat } from 'ai/vue'

const { messages, input, handleInputChange, handleSubmit } = useChat()

</script>

<template>
  <div>
    <ul v-for="m in messages" key="m.id">
      <li>{{ m.role }}: {{ m.content }} </li>
    </ul>
  
    <form @submit="handleSubmit">
      <input
        v-model="input"
        placeholder="Say something..."
        @change="handleInputChange"
      />
    </form>
  </div>
</template>
```

After submitting a message, `useChat` will automatically append a user message to the chat history and trigger an API call to the configured endpoint. The response will be streamed to the chat history and returned by the function as `messages`. Whenever a new chunk of streamed messages is received, it will update the UI to reflect the new messages.

This enables a seamless chat experience where the user can see the AI response as soon as it is available, without having to wait for the entire response to be received.

### `UseChatOptions` [#use-chat-options]

Options passed to `useChat`:

<OptionTable
options={[
[
'api',
"string = '/api/chat'",
'The API endpoint that accepts a `{ messages: Message[] }` object and returns a stream of tokens of the AI chat response. Defaults to `/api/chat`.'
],
[
'id',
'string',
'An unique identifier for the chat. If not provided, a random one will be generated. When provided, the `useChat` hook with the same `id` will have shared states across components. This is useful when you have multiple components showing the same chat stream'
],
[
'initialInput',
"string = ''",
'An optional string of initial prompt input'
],
[
'initialMessages',
'Messages[] = []',
'An optional array of initial chat messages'
],
[
'onResponse',
'(res: Response) => void',
'An optional callback that will be called with the response from the API endpoint. Useful for throwing customized errors or logging'
],
[
'onFinish',
'(message: Message) => void',
'An optional callback that will be called when the chat stream ends'
],
[
'onError',
'(err: Error) => void',
'An optional callback that will be called when the chat stream encounters an error'
],
[
'headers',
'Record<string, string> | Headers',
'An optional object of headers to be passed to the API endpoint'
],
[
'body',
'any',
'An optional, extra body object to be passed to the API endpoint in addition to the `messages` array'
]
]}
/>

### `ChatHelpers` [#chat-helpers]

The `useChat` function returns an object containing several helper methods and variables to manage the chat state:

<OptionTable
options={[
[
'messages',
'Ref<Message[]>',
'A ref with an array of chat messages. The store will be updated whenever a new chunk of messages is received.'
],
[
'error',
'Ref<Error | undefined>',
'The error thrown during the request, if any.'
],
[
'append',
'(message: Message | CreateMessage) => Promise<string | undefined>',
'Function to append a message to the chat, triggering an API call for the AI response. It returns a promise that resolves to full response message content when the API call is successfully finished, or throws an error when the API call fails.'
],
[
'reload',
'() => Promise<string | undefined>',
"Function to reload the last AI chat response for the given chat history. If the last message isn't from the assistant, it will request the API to generate a new response."
],
['stop', '() => void', 'Function to abort the current API request.'],
[
'setMessages',
'(messages: Message[]) => void',
'Function to locally update the `messages` state locally without triggering an API call.'
],
[
'input',
'Ref<string>',
'A ref containing the current value of the input field.'
],
[
'handleSubmit',
'(e: React.FormEvent<HTMLFormElement>) => void',
'Form submission handler that automatically resets the input field and appends a user message.'
],
[
'isLoading',
'boolean',
'Boolean flag indicating whether a request is currently in progress.'
]
]}
/>

</Tab>
</FrameworkTabs>
