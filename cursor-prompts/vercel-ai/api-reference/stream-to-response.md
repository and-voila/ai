# streamToResponse

<Callout>
  `ReadableStream` requires Node.js 18.0.0+ or polyfilled with a library like
  [`web-streams-polyfill`](https://www.npmjs.com/package/web-streams-polyfill).
</Callout>

## `streamToResponse(stream: ReadableStream, response: ServerResponse, options?: Options)`

This method will pipe a `ReadableStream` to a Node.js `ServerResponse` object. It can be helpful to combine this with other AI stream utilities, such as [`OpenAIStream`](/docs/api-reference/openai-stream#openaistream), in Node.js environments.

Similar to [`StreamingTextResponse`](/docs/api-reference/streaming-text-response#streamingtextresponse), it automatically sets the status code to `200` and the `Content-Type` header to `'text/plain; charset=utf-8'`.

import { Callout } from 'nextra-theme-docs'
import { OptionTable } from '@/components/table'

## Parameters

### `stream: ReadableStream`

The Web Stream to pipe to the response. It can be the return value of [`OpenAIStream`](/docs/api-reference/openai-stream#openaistream), [`HuggingFaceStream`](/docs/api-reference/huggingface-stream#huggingfacestream), [`AnthropicStream`](/docs/api-reference/anthropic-stream#anthropicstream), or an [`AIStream`](/docs/api-reference/ai-stream#aistream) instance.

### `response: ServerResponse`

The Node.js `ServerResponse` object to pipe the stream to. This is usually the second argument of a Node.js HTTP request handler.

### `options?: Options`

Optional object to configure the response, with the following properties:

<OptionTable
options={[
[
'status',
'number',
'The status code to set on the response. Defaults to `200`.'
],
[
'headers',
'Record<string, string>',
"Additional headers to set on the response. Defaults to `{ 'Content-Type': 'text/plain; charset=utf-8' }`."
]
]}
/>

## Example: Node.js HTTP Server

Here is an example of using `streamToResponse` to pipe an AI stream to a Node.js HTTP server:

```js
import { createServer } from 'http'
import OpenAI from 'openai'
import { OpenAIStream, streamToResponse } from 'ai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})

const server = createServer((req, res) => {
  const aiResponse = await openai.chat.completions.create({
    model: 'gpt-4',
    stream: true,
    messages: /* ... */
  })

  // Transform the response into a readable stream
  const stream = OpenAIStream(aiResponse)

  // Pipe the stream to the response
  streamToResponse(stream, res)
})

server.listen(3000)
```
