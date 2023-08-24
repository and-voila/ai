---
title: <Tokens />
layout:
  toc: false
---

# `<Tokens />`

The Tokens component is a React Server Component for streaming in tokens in a React Component.
You can view a live demo with Next.js [here](https://rsc-llm-on-the-edge.vercel.app)

## Props

```typescript
type Props = {
  /**
   * A ReadableStream produced by the AI SDK.
   */
  stream: ReadableStream;
};
```

## Usage

The below example shows usage with OpenAI, but any of the SDK's supported providers work as long as you provide a ReadableStream.

```jsx
// app/page.tsx
import { Tokens } from 'ai/react'

export const runtime = 'edge';

export default function Page() {
  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    stream: true,
    messages: [...]
  })

  // Convert the response into a friendly text-stream using the SDK's wrappers
  const stream = OpenAIStream(response)

  return <Tokens stream={stream} />
}
```

And that's it! More customization and examples will be coming soon as we continue to build the AI SDK and explore different use-cases.
