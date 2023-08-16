import { MagicWandIcon } from 'ui';
import React from 'react';

import { allUseCases } from '@/.contentlayer/generated';
import { Container } from '@/components/container';
import Cta from '@/components/cta';
import { FadeIn } from '@/components/fade-in';
import { GrayscaleTransitionImage } from '@/components/grayscale-transition-image';
import { Mdx } from '@/components/mdx-components';
import { PageIntro } from '@/components/page-intro';
import { PageLinks } from '@/components/page-links';
import { formattedDate } from '@/components/utils';

interface UseCaseSlugPageProps {
  params: {
    slug: string;
  };
}
function UseCaseSlugPage({ params }: UseCaseSlugPageProps) {
  const moreUseCases = allUseCases.filter(
    (useCase) => useCase.slug !== params.slug,
  );

  const doc = allUseCases.find((doc) => doc.slug === params.slug);

  const data = {
    date: {
      title: 'Date',
      description: formattedDate(doc?.date),
    },
    feature: {
      title: 'Feature',
      description: doc?.feature,
    },
    benefit: {
      title: 'Benefit',
      description: doc?.benefit,
    },
  };

  return (
    <article className="mt-24 sm:mt-32 lg:mt-40">
      <header>
        <PageIntro eyebrow="Use Case" title={doc?.title ?? ''} centered>
          <div className="text-center text-muted-foreground">
            <p>{doc?.description}</p>
          </div>
        </PageIntro>
        <FadeIn>
          <div className="mt-24 border-t bg-primary/50 sm:mt-32 lg:mt-40">
            <Container>
              <div className="mx-auto max-w-5xl">
                <dl className="-mx-6 grid grid-cols-1 text-sm sm:mx-0 sm:grid-cols-3">
                  <div className="border-t px-6 py-4 text-foreground first:border-t-0 sm:border-l sm:border-t-0">
                    <dt className="font-semibold">{data.date.title}</dt>
                    <dd className="text-muted-foreground">
                      {formattedDate(data.date.description)}
                    </dd>
                  </div>
                  <div className="border-t px-6 py-4 text-primary-foreground first:border-t-0 sm:border-l sm:border-t-0">
                    <dt className="font-semibold text-foreground">
                      {data.feature.title}
                    </dt>
                    <dd className="text-muted-foreground">
                      {data.feature.description}
                    </dd>
                  </div>
                  <div className="border-t px-6 py-4 text-foreground first:border-t-0 sm:border-l sm:border-t-0">
                    <dt className="font-semibold">{data.benefit.title}</dt>
                    <dd className="text-muted-foreground">
                      {data.benefit.description}
                    </dd>
                  </div>
                </dl>
              </div>
            </Container>
          </div>
          <div className="border-y bg-primary-foreground/5">
            <div className="-my-px mx-auto max-w-[76rem] bg-primary/5">
              <GrayscaleTransitionImage
                src="/images/use-case.webp"
                alt="Hero"
                quality={90}
                width={100}
                height={100}
                className="w-full"
                sizes="(min-width: 1216px) 76rem, 100vw"
                priority
              />
            </div>
          </div>
        </FadeIn>
      </header>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <FadeIn>
          <div className="prose mx-auto dark:prose-invert md:prose-lg">
            <Mdx code={doc?.body.code ?? ''} />
          </div>
        </FadeIn>
      </Container>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <FadeIn>
          <div>
            <Cta
              title="Power up your creativity"
              text="See firsthand how And Voila AI can enhance your creative process. Sign up now and try for yourself."
              linkHref="/sign-up"
              buttonText="Sign Up Free"
              buttonIcon={<MagicWandIcon />}
              footerText="No credit card required"
            />
          </div>
        </FadeIn>
      </Container>

      {moreUseCases.length > 0 && (
        <PageLinks
          className="mt-24 sm:mt-32 lg:mt-40"
          title="More use cases"
          pages={moreUseCases.slice(0, 2)}
        />
      )}
    </article>
  );
}

export default UseCaseSlugPage;
