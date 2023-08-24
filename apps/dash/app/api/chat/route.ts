import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = 'edge';

export async function POST(req: Request) {
  const { messages } = (await req.json()) as {
    messages: {
      role: 'system' | 'user' | 'assistant' | 'function';
      content: string | null;
      name: string;
    }[];
  };

  if (!messages) {
    return new Response('Invalid request', { status: 400 });
  }

  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    stream: true,
    messages,
  });
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
