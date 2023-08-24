---
title: ai/prompts
---

import { Callout } from 'nextra-theme-docs'

# `ai/prompts`

The `ai/prompts` module contains functions to assist with converting `Message`'s into prompts that can be used with the [`useChat`](./use-chat) and [`useCompletion`](./use-completion) hooks.

<Callout>
  The `experimental_` prefix on the functions in this module indicates that the
  API is not yet stable and may change in the future without a major version
  bump.
</Callout>

## `experimental_buildOpenAssistantPrompt`

Uses `<|prompter|>`, `<|endoftext|>`, and `<|assistant>` tokens. If a `Message` with an unsupported `role` is passed, an error will be thrown.

```ts filename="route.ts" {6}
import { experimental_buildOpenAssistantPrompt } from 'ai/prompts';

const { messages } = await req.json();
const response = Hf.textGenerationStream({
  model: 'OpenAssistant/oasst-sft-4-pythia-12b-epoch-3.5',
  inputs: experimental_buildOpenAssistantPrompt(messages),
});
```

## `experimental_buildStarChatBetaPrompt`

Uses `<|user|>`, `<|end|>`, `<|system|>`, and `<|assistant>` tokens. If a `Message` with an unsupported `role` is passed, an error will be thrown.

```ts filename="route.ts" {6}
import { experimental_buildStarChatBetaPrompt } from 'ai/prompts';

const { messages } = await req.json();
const response = Hf.textGenerationStream({
  model: 'HuggingFaceH4/starchat-beta',
  inputs: experimental_buildStarChatBetaPrompt(messages),
});
```

## `experimental_buildLlama2Prompt`

Uses LLama 2 chat tokens (`[INST]`) to create a prompt, learn more in the [Hugging Face Blog on how to prompt Llama 2](https://huggingface.co/blog/llama2#how-to-prompt-llama-2). If a `Message` with an unsupported `role` is passed, an error will be thrown.

```ts filename="route.ts" {6}
import { experimental_buildLlama2Prompt } from 'ai/prompts';

const { messages } = await req.json();
const response = Hf.textGenerationStream({
  model: 'meta-llama/Llama-2-7b-chat-hf',
  inputs: experimental_buildLlama2Prompt(messages),
});
```
