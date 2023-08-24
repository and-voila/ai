---
title: AIStream
---

import { OptionTable } from '@/components/table';

# AIStream

## `AIStream(res: Response, customParser: AIStreamParser => void, callbacks?: AIStreamCallbacks): ReadableStream` [#aistream]

`AIStream` is a helper function for creating a readable stream for AI responses. This is based on the responses returned by `fetch` and serves as the basis for the [`OpenAIStream`](./openai-stream) and [`AnthropicStream`](./anthropic-stream). It allows you to handle AI response streams in a controlled and customized manner that will work with [`useChat`](./use-chat) and [`useCompletion`](./use-completion).

`AIStream` will throw an error if `res` doesn't have a `2xx` status code. This is to ensure that the stream is only created for successful responses.

## Parameters

### `res: Response`

This is the response object returned by `fetch`. It's used as the source of the readable stream.

### `customParser: AIStreamParser => void`

This is a function that is used to parse the events in the stream. It should return a function that receives a stringified chunk from the LLM and extracts the message content. The function is expected to return nothing (`void`) or a string.

### `callbacks?: AIStreamCallbacks`

This is an optional parameter which is an object that contains callback functions for handling the start, completion, and each token of the AI response.

### Types

#### `AIStreamParser`

```tsx
interface AIStreamParser {
  (data: string): string | void
}
```

#### `AIStreamCallbacks`

This is an object that contains the following properties:

<OptionTable
options={[
[
'onStart',
'() => Promise<void>',
'An optional function that is called at the start of the stream processing.',
],
[
'onCompletion',
'(completion: string) => Promise<void>',
"An optional function that is called for every completion. It's passed the completion as a string.",
],
[
'onFinal',
'(completion: string) => Promise<void>',
"An optional function that is called once for every request. It's passed the completion as a string. Differs from onCompletion when function calls are present.",
],
[
'onToken',
'(token: string) => Promise<void>',
"An optional function that is called for each token in the stream. It's passed the token as a string.",
],
]}
/>

## Example: Using `AIStream` to create [`AnthropicStream`](./anthropic-stream)

Here is real example of how to use `AIStream` to create a stream that will work with [`useChat`](./use-chat) and [`useCompletion`](./use-completion). Here's is the implementation for [`AnthropicStream`](./anthropic-stream) which expects a response returned by `fetch`. [`AnthropicStream`](./anthropic-stream) is a specific implementation of `AIStream` for the Anthropic AI platform.

```tsx
import { AIStream, type AIStreamParser, type AIStreamCallbacks } from 'ai'

function parseAnthropicStream(): AIStreamParser {
  let previous = ''

  return data => {
    const json = JSON.parse(data) as {
      completion: string
      stop: string | null
      stop_reason: string | null
      truncated: boolean
      log_id: string
      model: string
      exception: string | null
    }

    // Anthropic's `completion` field is cumulative unlike OpenAI's
    // deltas. In order to compute the delta, we must slice out the text
    // we previously received.
    const text = json.completion
    const delta = text.slice(previous.length)
    previous = text

    return delta
  }
}

export function AnthropicStream(
  res: Response,
  cb?: AIStreamCallbacks
): ReadableStream {
  return AIStream(res, parseAnthropicStream(), cb)
}

// Then you can use AnthropicStream like this:
const fetchResponse = await fetch('/api/anthropic-endpoint')
const anthropicStream = AnthropicStream(fetchResponse, {
  onStart: async () => {
    console.log('Stream started')
  },
  onCompletion: async completion => {
    console.log('Completion completed', completion)
  },
  onFinal: async completion => {
    console.log("Stream completed", completion)
  }
  onToken: async token => {
    console.log('Token received', token)
  }
})
// Now you can consume the anthropicStream
```

In the example above, we first define a `parseAnthropicStream` function that handles the specific data structure returned by the Anthropic platform.
We then create an `AnthropicStream` function which uses `AIStream` with the `parseAnthropicStream` parser.
Finally, we fetch a response and pass it to `AnthropicStream` along with some callback functions, and create a readable stream that we can consume as desired.
