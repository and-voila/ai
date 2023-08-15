import Image from 'next/image';

import { Container } from '@/components/container';
import { Divider } from '@/components/divider';
import { FadeIn, FadeInStagger } from '@/components/fade-in';

const clients = [
  ['Anthropic', '/images/ai-partners/anthropic/anthropic-light-logomark.svg'],
  ['Cohere', '/images/ai-partners/cohere/cohere-light-logomark.svg'],
  ['Hugging Face', '/images/ai-partners/hugging-face/hf-light-logomark.svg'],
  ['Langchain', '/images/ai-partners/lang-chain/langchain-light-logomark.svg'],
  ['Meta AI', '/images/ai-partners/meta-ai/meta-light-logomark.svg'],
  ['Open AI', '/images/ai-partners/open-ai/openai-light-logomark.svg'],
  ['Replicate', '/images/ai-partners/replicate/replicate-light-logomark.svg'],
  [
    'Stability',
    '/images/ai-partners/stability-ai/stability-light-logomark.svg',
  ],
];

export default function Clients() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn>
        <h2 className="font-display text-2xl font-semibold text-foreground">
          You’re in good company
        </h2>
      </FadeIn>
      <FadeInStagger className="mt-10" faster>
        <Divider as={FadeIn} />
        <ul
          role="list"
          className="grid grid-cols-2 gap-x-8 gap-y-12 sm:grid-cols-3 lg:grid-cols-4"
        >
          {clients.map(([client, logo]) => (
            <li key={client} className="group">
              <FadeIn className="overflow-hidden">
                <Divider className="pt-12 group-[&:nth-child(-n+2)]:-mt-px sm:group-[&:nth-child(3)]:-mt-px lg:group-[&:nth-child(4)]:-mt-px">
                  <div className="flex h-40 w-60 items-center justify-center rounded-lg bg-transparent p-3">
                    <Image src={logo} alt={client} width={200} height={200} />
                  </div>
                </Divider>
              </FadeIn>
            </li>
          ))}
        </ul>
      </FadeInStagger>
    </Container>
  );
}
