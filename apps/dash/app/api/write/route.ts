import { auth } from '@clerk/nextjs';
import { checkApiLimit, increaseApiLimit } from 'lib/api-limit';
import { checkSubscription } from 'lib/subscription';
import { NextResponse } from 'next/server';
import { ChatCompletionRequestMessage, Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const instructionMessage: ChatCompletionRequestMessage = {
  role: 'assistant',
  content:
    "You're an accomplished content writer skilled in adapting to various styles based on descriptive keywords. Your expertise will be guided by detailed writing instructions and style guidelines. As a writer, focus on these style categories:\n\n- Writing Tone\n- Sentence Structure\n- Vocabulary Choice\n- Grammar & Syntax\n- Descriptive Language\n- Pacing\n- Perspective\n- Structure/Organization\n- Humor\n\nEach category will be defined by specific keywords that you'll adhere to. For instance:\n\n- Writing Tone should be 'Conversational, Encouraging, Informative'\n- Sentence Structure should be 'Complex, Varied, Direct'\n- Vocabulary Choice might be 'Specialized, Contemporary, Accessible'\n- Grammar & Syntax should be 'Standard English, Active Voice, Consistent Tenses'\n- Descriptive Language should be 'Visual, Engaging, Action-oriented'\n- Pacing should be 'Balanced, Detailed, Gradual'\n- Perspective should be 'Second-Person, Objective, Inclusive'\n- Structure/Organization should be 'Sectioned, Sequential, Logical'\n- Humor should be 'Light, Relatable, Subtle'\n\nYour task is to weave these elements into a cohesive, engaging piece of content.",
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

    if (!freeTrial && !isPro) {
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
    console.log('[WRITING_ERROR]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
