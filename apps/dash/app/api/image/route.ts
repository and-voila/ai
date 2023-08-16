import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { Configuration, OpenAIApi } from 'openai';

import { checkApiLimit, increaseApiLimit } from 'lib/api-limit';
import { checkSubscription } from 'lib/subscription';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, amount = 1, resolution = '512x512' } = body;

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!configuration.apiKey) {
      return new NextResponse('OpenAI API Key not configured', { status: 500 });
    }

    if (!prompt) {
      return new NextResponse('Oops, a prompt is required.', { status: 400 });
    }

    if (!amount) {
      return new NextResponse('Oops, an amount is required.', { status: 400 });
    }

    if (!resolution) {
      return new NextResponse('Oops, a resolution is required.', {
        status: 400,
      });
    }

    const freeTrial = await checkApiLimit();
    const isPro = await checkSubscription();

    if (!freeTrial) {
      return new NextResponse('Free trial has expired', { status: 403 });
    }

    const response = await openai.createImage({
      prompt: prompt,
      n: parseInt(amount, 10),
      size: resolution,
    });

    if (!isPro) {
      await increaseApiLimit();
    }

    return NextResponse.json(response.data.data);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('[IMAGE_ERROR]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
