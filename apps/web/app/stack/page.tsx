import { Metadata } from 'next';
import React, { Suspense } from 'react';

import { allLegals } from '@/.contentlayer/generated';
import { Container } from '@/components/container';
import { FadeIn } from '@/components/fade-in';
import { ArticleLoader } from '@/components/loaders';
import { Mdx } from '@/components/mdx-components';
import { PageIntro } from '@/components/page-intro';
import { ContactSection } from '@/components/sections/home/contact-section';
import { SITE_URL } from '@/lib/constants';

export function generateMetadata(): Metadata {
  const title = 'Tech Stack';
  const description =
    'Explore the stack that powers our business and product. From day-to-day operations to app development, we thrive on open-source solutions. Proudly open source.';

  const url = `${SITE_URL}/stack`;

  const metadata = {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
    },
    twitter: {
      title,
      description,
    },
  };

  return metadata;
}

function Stack() {
  const stack = allLegals.find((doc) => doc.slug === 'stack');
  return (
    <main>
      <Suspense fallback={<ArticleLoader />}>
        <Container as="article" className="mt-24 sm:mt-32 lg:mt-40">
          <FadeIn>
            <PageIntro centered eyebrow="Stack" title={stack?.title ?? ''}>
              <p className="text-muted-foreground">{stack?.description}</p>
            </PageIntro>
          </FadeIn>

          <FadeIn>
            <div className="prose prose-slate mx-auto mt-24 dark:prose-invert md:prose-lg sm:mt-32 lg:mt-40">
              <Mdx code={stack?.body.code ?? ''} />
            </div>
          </FadeIn>
        </Container>
      </Suspense>
      <ContactSection />
    </main>
  );
}

export default Stack;
