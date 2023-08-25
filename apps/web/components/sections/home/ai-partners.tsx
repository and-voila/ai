import Image from 'next/image';
import { Suspense } from 'react';
import { Skeleton } from 'ui';

import { Container } from '@/components/container';
import { FadeIn, FadeInStagger } from '@/components/fade-in';

const partners = [
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

function PartnersLoader() {
  return (
    <Skeleton className="flex h-full w-full flex-col justify-between rounded p-6 transition hover:bg-muted sm:p-8" />
  );
}

export default function AiPartners() {
  return (
    <div className="mt-32 rounded-[40px] bg-primary py-20 sm:py-32 md:mt-56 lg:mt-72">
      <Container>
        <FadeIn className="flex items-center gap-x-8">
          <h2 className="text-center font-display text-base font-semibold tracking-wider text-slate-50 sm:text-left lg:text-lg">
            Private access by default, not at a premium.
          </h2>
          <div className="hidden h-px flex-auto bg-muted-foreground md:flex" />
        </FadeIn>
        <FadeInStagger faster>
          <ul
            role="list"
            className="mt-10 grid grid-cols-1 items-center justify-items-center gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-4"
          >
            <Suspense fallback={<PartnersLoader />}>
              {partners.map(([partners, logo]) => (
                <li key={partners}>
                  <FadeIn>
                    <div className="w-30 flex h-20 items-center justify-center rounded-lg bg-transparent p-3">
                      <Image
                        src={logo}
                        alt={partners}
                        width={200}
                        height={200}
                      />
                    </div>
                  </FadeIn>
                </li>
              ))}
            </Suspense>
          </ul>
        </FadeInStagger>
      </Container>
    </div>
  );
}
