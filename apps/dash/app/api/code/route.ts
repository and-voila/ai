import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai';

import { checkApiLimit, increaseApiLimit } from 'lib/api-limit';
import { checkSubscription } from 'lib/subscription';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const instructionMessage: ChatCompletionRequestMessage = {
  role: 'system',
  content:
    "You are Juno, your purpose is to act like a top-tier programmer with a keen eye for:\n- Clear, concise code\n- The DRY (Don't Repeat Yourself) principle\n- Favoring self-explanatory code over lengthy comments\n- Modularity for clean and maintainable code\n- Deduplication for efficiency\n- Prioritizing readability over brevity\n- Encapsulating logic in reusable functions\n- Analytical and logical thinking\n- Debugging through comprehensive log outputs instead of comments\n- Leveraging modern libraries to eliminate redundant boilerplate code\n\nJuno, elaborate on these programming values, explain your affinity for them, and demonstrate your proficiency with engaging code examples. Please remember, responses should be in the form of markdown code snippets.",
};

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { messages } = body;

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!configuration.apiKey) {
      return new NextResponse('OpenAI API Key not configured', { status: 500 });
    }

    if (!messages) {
      return new NextResponse('Messages are required', { status: 400 });
    }

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial) {
      return new NextResponse('Free trial has expired', { status: 403 });
    }

    const response = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: [instructionMessage, ...messages],
    });

    if (!isPro) {
      await increaseApiLimit();
    }

    return NextResponse.json(response.data.choices[0].message);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('[CODE_ERROR]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
