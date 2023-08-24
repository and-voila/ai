---
title: OpenAI Functions
---

import { Steps, Callout } from 'nextra-theme-docs'

# OpenAI Functions

The Vercel AI SDK has **experimental support** for [OpenAI functions](https://openai.com/blog/function-calling-and-other-api-updates).
Any of the content below is subject to change as OpenAI continues to develop their functions API and we iterate on the Vercel AI SDK. You can see our planned roadmap [here](https://twitter.com/jaredpalmer/status/1673350963191508993).

If you are unfamiliar with OpenAI functions, it's recommended you refer to OpenAI's [announcement post](https://openai.com/blog/function-calling-and-other-api-updates).
It's important to know that OpenAI does _not_ handle calling the functions, but instead passes the function call to the consumer to handle via a special message and JSON.

## Defining Functions

To use functions with the OpenAI API, you need to pass a `functions` object to the API so the LLM knows it's capabilities.
The `functions` object is an array containing the schema for each function you want to define.
Here is an example:

```ts {3, 34}
import type { CompletionCreateParams } from 'openai/resources/chat';

const functions: CompletionCreateParams.Function[] = [
  {
    name: 'get_current_weather',
    description: 'Get the current weather',
    parameters: {
      type: 'object',
      properties: {
        location: {
          type: 'string',
          description: 'The city and state, e.g. San Francisco, CA',
        },
        format: {
          type: 'string',
          enum: ['celsius', 'fahrenheit'],
          description:
            'The temperature unit to use. Infer this from the users location.',
        },
      },
      required: ['location', 'format'],
    },
  },
];

// And use it like this:
export async function POST(req: Request) {
  const { messages } = await req.json();

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo-0613',
    stream: true,
    messages,
    functions,
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
```

You can then choose how you want to handle each function call: on the server or on the client.

## Handling Function Calls on the Server

On the server, you can pass an `experimental_onFunctionCall` callback to the `OpenAIStream`, which will be called when the model calls a function.
In order to support recursively calling functions and to construct the message context in the nested OpenAI calls, you can use `createFunctionCallMessages` to get the "assistant" and "function" messages.
You can also return a string which will be sent to the client as the "assistant" message (or returned back to the model as a response to a recursive function call).

```ts {2,3,4,15,17,21,22}
const stream = OpenAIStream(response, {
  experimental_onFunctionCall: async (
    { name, arguments: args },
    createFunctionCallMessages,
  ) => {
    // if you skip the function call and return nothing, the `function_call`
    // message will be sent to the client for it to handle
    if (name === 'get_current_weather') {
      // Call a weather API here
      const weatherData = {
        temperature: 20,
        unit: args.format === 'celsius' ? 'C' : 'F',
      };

      // `createFunctionCallMessages` constructs the relevant "assistant" and "function" messages for you
      const newMessages = createFunctionCallMessages(weatherData);
      return openai.chat.completions.create({
        messages: [...messages, ...newMessages],
        stream: true,
        model: 'gpt-3.5-turbo-0613',
        // see "Recursive Function Calls" below
        functions,
      });
    }
  },
});
```

You will then receive a regular "assistant" message on the client containing the output of the function call.

### Recursive Function Calls

If you want to support recursive function calls, you need to pass the `functions` object to the `createChatCompletion` call in the `experimental_onFunctionCall` handler.
The response from the nested call will be processed by the same logic (and therefore the same handler) as the initial OpenAI call, and the final response will be returned to the client.

## Handling Function Calls on the Client

On the client, you can pass an `experimental_onFunctionCall` handler to the `useCompletion` and `useChat` hooks.
This callback will be called when the server does not handle a function call and streams it to the client.
The handler will be called when the function is invoked. Here's a sample function handler:

```tsx
const functionCallHandler: FunctionCallHandler = async (
  chatMessages,
  functionCall
) => {
  if (functionCall.name === 'get_current_weather') {
    if (functionCall.arguments) {
      const parsedFunctionCallArguments = JSON.parse(functionCall.arguments)
      // You now have access to the parsed arguments here (assuming the JSON was valid)
      // If JSON is invalid, return an appropriate message to the model so that it may retry?
      console.log(parsedFunctionCallArguments)
    }

    // Generate a fake temperature
    const temperature = Math.floor(Math.random() * (100 - 30 + 1) + 30)
    // Generate random weather condition
    const weather = ['sunny', 'cloudy', 'rainy', 'snowy'][
      Math.floor(Math.random() * 4)
    ]

    const functionResponse: ChatRequest = {
      messages: [
        ...chatMessages,
        {
          id: nanoid(),
          name: 'get_current_weather',
          role: 'function' as const,
          content: JSON.stringify({
            temperature,
            weather,
            info: 'This data is randomly generated and came from a fake weather API!'
          })
        }
      ]
    }
    return functionResponse
  }
}
```

Then just pass the handler to the hook:

```tsx
const { messages, input, handleInputChange, handleSubmit } = useChat({
  experimental_onFunctionCall: functionCallHandler
})
```

Now, when the model calls the `get_current_weather` function, the OpenAI API will return a specially formatted message with the arguments and the name of the function to call.
Your handler will then be invoked on the client to handle the function call and manipulate the chat accordingly.

### Rendering messages

The `Message` type has been updated with an optional `function_call` value that can either be an `CreateChatCompletionRequestFunction` object or a string.

A `CreateChatCompletionRequestFunction` looks like this:

```typescript
{
    /**
     * The name of the function to call.
     */
    name?: string;
    /**
     * The arguments to call the function with, as generated by the model in JSON format. Note that the model does not always generate valid JSON, and may hallucinate parameters not defined by your function schema. Validate the arguments in your code before calling your function.
     */
    arguments?: string;
}
```

So you can interact with the function call:

```tsx
{
  message.role === 'function' && message.function_call && (
    <div>
      <p>Function name: {message.function_call.name}</p>
      <p>Function arguments: {message.function_call.arguments}</p>
    </div>
  )
}
```

However, while a function is streaming in, it will not be valid JSON that can be parsed to a `CreateChatCompletionRequestFunction` object, so the `function_call` value will be a string instead.
If you want to stream in the functions raw data, you need to handle this special case:

```tsx
if (m.function_call) {
  const functionCallString =
    typeof m.function_call === 'string'
      ? m.function_call
      : JSON.stringify(m.function_call)

  return (
    <>
      {functionCallString.split('\\n').map((line, index) => (
        <p key={index}>{line}</p>
      ))}
    </>
  )
} else {
  return m.content
}
```

<Callout>
  When using the `experimental_StreamData` API, the assistant message containing
  the `function_call` has no `content`. Previously, it contained the stringified
  function_call contents.
</Callout>
