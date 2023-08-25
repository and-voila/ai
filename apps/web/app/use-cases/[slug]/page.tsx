import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';
import { MagicWandIcon } from 'ui';

import { allUseCases } from '@/.contentlayer/generated';
import { Container } from '@/components/container';
import Cta from '@/components/cta';
import { FadeIn } from '@/components/fade-in';
import { GrayscaleTransitionImage } from '@/components/grayscale-transition-image';
import { ArticleLoader } from '@/components/loaders';
import { Mdx } from '@/components/mdx-components';
import { PageIntro } from '@/components/page-intro';
import { formattedDate } from '@/components/utils';
import { SITE_URL } from '@/lib/constants';

const PageLinks = dynamic(() =>
  import('@/components/page-links').then((mod) => mod.PageLinks),
);

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
    <main>
      <Suspense fallback={<ArticleLoader />}>
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
        </article>

        <Container className="mt-24 sm:mt-32 lg:mt-40">
          <FadeIn>
            <div className="prose prose-slate mx-auto dark:prose-invert md:prose-lg">
              <Mdx code={doc?.body.code ?? ''} />
            </div>
          </FadeIn>
        </Container>
      </Suspense>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <FadeIn>
          <div>
            <Cta
              title="Power up your creativity"
              text="See firsthand how And Voila AI can enhance your creative process. Sign up now and try for yourself."
              linkHref="https://app.andvoila.ai/sign-up"
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
    </main>
  );
}

export default UseCaseSlugPage;

export async function generateMetadata({ params }: UseCaseSlugPageProps) {
  const doc = allUseCases.find((doc) => doc.slug === params.slug);

  const title = doc?.title ?? 'Use Case';
  const description =
    doc?.description ?? 'Detailed description of the use case.';
  const url = `${SITE_URL}/use-case/${params.slug}`;
  const openGraphImage = '/open-graph.jpg';

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: openGraphImage,
    },
    twitter: {
      title,
      description,
      images: openGraphImage,
    },
  };
}
