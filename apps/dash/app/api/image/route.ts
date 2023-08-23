import { auth } from '@clerk/nextjs';
import { checkApiLimit, increaseApiLimit } from 'lib/api-limit';
import { checkSubscription } from 'lib/subscription';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { prompt, amount = 1, resolution = '512x512' } = body;

    if (!userId) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    if (!openai.apiKey) {
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

    const response = await openai.images.generate({
      prompt: prompt,
      n: parseInt(amount, 10),
      size: resolution,
    });

    if (!isPro) {
      await increaseApiLimit();
    }

    return NextResponse.json(response.data);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log('[IMAGE_ERROR]', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}
