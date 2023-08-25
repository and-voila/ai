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
  const title = 'Terms of Service';
  const description =
    "Start risk-free with our 30 day, 100% money back guarantee. If you aren't delighted, let us know within 30 days. We'll provide you a no-hassle refund.";

  const url = `${SITE_URL}/terms`;

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

function Terms() {
  const terms = allLegals.find((doc) => doc.slug === 'terms');

  return (
    <main>
      <Suspense fallback={<ArticleLoader />}>
        <Container as="article" className="mt-24 sm:mt-32 lg:mt-40">
          <FadeIn>
            <PageIntro
              centered
              eyebrow="Terms of Service"
              title={terms?.title ?? ''}
            >
              <p className="text-muted-foreground">{terms?.description}</p>
            </PageIntro>
          </FadeIn>

          <FadeIn>
            <div className="prose prose-slate mx-auto mt-24 dark:prose-invert md:prose-lg sm:mt-32 lg:mt-40">
              <Mdx code={terms?.body.code ?? ''} />
            </div>
          </FadeIn>
        </Container>
      </Suspense>

      <ContactSection />
    </main>
  );
}

export default Terms;
