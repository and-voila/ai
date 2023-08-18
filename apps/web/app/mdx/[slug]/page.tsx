import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';
import { MagicWandIcon } from 'ui';

import { allPosts } from '@/.contentlayer/generated';
import { Container } from '@/components/container';
import Cta from '@/components/cta';
import { FadeIn } from '@/components/fade-in';
import { ArticleLoader } from '@/components/loaders';
import { Mdx } from '@/components/mdx-components';
import { formattedDate } from '@/components/utils';
import { SITE_URL } from '@/lib/constants';

const PageLinks = dynamic(() =>
  import('@/components/page-links').then((mod) => mod.PageLinks),
);

interface MdxSlugPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: MdxSlugPageProps) {
  const mdx = allPosts.find((doc) => doc.slug === params.slug);

  const title = mdx?.title ?? 'Blog';
  const description =
    mdx?.description ??
    "Stay up to date with the latest tips, tricks, and insights from the And Voila Team. We'll help you unlock your creativity with AI to delight your audience.";
  const url = `${SITE_URL}/mdx/${params.slug}`;
  const openGraphImage = `${SITE_URL}/open-graph.jpg`;

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

function MdxSlugPage({ params }: MdxSlugPageProps) {
  const mdx = allPosts.find((doc) => doc.slug === params.slug);
  const moreMdx = allPosts.filter((doc) => doc.slug !== params.slug);
  return (
    <>
      <Suspense fallback={<ArticleLoader />}>
        <Container as="article" className="mt-24 sm:mt-32 lg:mt-40">
          <FadeIn>
            <header className="mx-auto flex max-w-5xl flex-col text-center">
              <h1 className="mt-6 font-display text-5xl font-medium tracking-tight text-foreground [text-wrap:balance] sm:text-7xl">
                {mdx?.title}
              </h1>
              <time
                dateTime={mdx?.date}
                className="order-first text-sm text-muted-foreground"
              >
                {mdx?.date && formattedDate(mdx.date)}{' '}
              </time>
              <p className="mt-6 text-sm font-medium text-muted-foreground">
                by And Voila • Team
              </p>
            </header>
          </FadeIn>

          <FadeIn>
            <div className="prose mx-auto mt-16 dark:prose-invert md:prose-lg sm:mt-24">
              <Mdx code={mdx?.body.code ?? ''} />
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
              linkHref="/sign-up"
              buttonText="Sign Up Free"
              buttonIcon={<MagicWandIcon />}
              footerText="No credit card required"
            />
          </div>
        </FadeIn>
      </Container>

      {moreMdx.length > 0 && (
        <PageLinks
          className="mt-24 sm:mt-32 lg:mt-40"
          title="More articles"
          pages={moreMdx}
        />
      )}
    </>
  );
}

export default MdxSlugPage;
