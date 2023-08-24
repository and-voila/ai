# AnthropicStream

## `AnthropicStream(res: Response, cb?: AIStreamCallbacks): ReadableStream` [#anthropicstream]

The `AnthropicStream` function is a utility that transforms the output from [Anthropic's](https://www.anthropic.com) API into a `ReadableStream`. It uses `AIStream` under the hood, applying a specific parser for the Anthropic's response data structure.

This works with the official Anthropic API endpoint via the `fetch` standard, and it's supported in both Node.js, [Edge Runtime](https://edge-runtime.vercel.app), and browser environments.

## Parameters

### `res: Response`

The `Response` object returned by the request to the Anthropic API endpoint.

### `cb?: AIStreamCallbacks`

This optional parameter can be an object containing callback functions to handle the start, each token, and completion of the AI response. In the absence of this parameter, default behavior is implemented.

## Example

The `AnthropicStream` function can be coupled with a `fetch` call to the Anthropic API to generate a readable stream of the completion. This stream can then facilitate the real-time consumption of AI outputs as they're being generated.

Here's a step-by-step example of how to implement this in Next.js:

```js filename="app/api/completion/route.ts"
import { AnthropicStream, StreamingTextResponse } from 'ai'

export const runtime = 'edge'

export async function POST(req: Request) {
  const { prompt } = await req.json()

  const response = await fetch('https://api.anthropic.com/v1/complete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY
    },
    body: JSON.stringify({
      prompt,
      model: 'claude-v1',
      max_tokens_to_sample: 300,
      temperature: 0.9,
      stream: true
    })
  })

  // Convert the response into a friendly text-stream
  const stream = AnthropicStream(response)

  // Respond with the stream
  return new StreamingTextResponse(stream)
}
```

In this example, the `AnthropicStream` function transforms the text generation stream from the Anthropic API into a ReadableStream of parsed result. This allows clients to consume AI outputs in real-time as they're generated, instead of waiting for the complete response.
