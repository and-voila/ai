---
title: experimental_StreamData
layout:
  toc: false
---

import { Callout } from 'nextra-theme-docs'

# `experimental_StreamData`

The `experimental_StreamData` class allows you to stream arbitrary data to the client alongside your LLM response.
For information on the implementation, see the associated [pull request](https://github.com/vercel/ai/pull/425).

<Callout>
  The `experimental_` prefix indicates that the API is not yet stable and may
  change in the future without a major version bump.

It is currently only implemented from `ai/react`'s `useChat` hook.

</Callout>

## Usage

### On the Server

```jsx filename="app/api/chat/route.ts" {11-12,26-28,45-46,49-51,53-56}
export async function POST(req: Request) {
  const { messages } = await req.json()

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo-0613',
    stream: true,
    messages,
    functions
  })

  // Instantiate the StreamData. It works with all API providers.
  const data = new experimental_StreamData()

  const stream = OpenAIStream(response, {
    experimental_onFunctionCall: async (
      { name, arguments: args },
      createFunctionCallMessages
    ) => {
      if (name === 'get_current_weather') {
        // Call a weather API here
        const weatherData = {
          temperature: 20,
          unit: args.format === 'celsius' ? 'C' : 'F'
        }

        data.append({
          text: 'Some custom data'
        })

        const newMessages = createFunctionCallMessages(weatherData)
        return openai.chat.completions.create({
          messages: [...messages, ...newMessages],
          stream: true,
          model: 'gpt-3.5-turbo-0613'
        })
      }
    },
    onCompletion(completion) {
      console.log('completion', completion)
    },
    onFinal(completion) {
      // IMPORTANT! you must close StreamData manually or the response will never finish.
      data.close()
    },
    // IMPORTANT! until this is stable, you must explicitly opt in to supporting streamData.
    experimental_streamData: true
  })

  data.append({
    text: 'Hello, how are you?'
  })

  // IMPORTANT! If you aren't using StreamingTextResponse, you MUST have the `X-Experimental-Stream-Data: 'true'` header
  // in your response so the client uses the correct parsing logic.
  return new StreamingTextResponse(stream, {}, data)
}
```

### On the client

In future versions, each `Message` will have a `data` object attached to it. For the initial implementation, the SDK only supports a global `data`
returned by the `useChat` hook:

```jsx
const { data } = useChat({
  api: '/api/chat',
});
```

And `data` is of the type `JSONValue[]`
