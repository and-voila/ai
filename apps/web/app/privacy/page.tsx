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
  const title = 'Privacy';
  const description =
    'And Voila AI, Inc. is a privacy-first company. We are committed to protecting your creative process, data, and IP. Learn more about our privacy policy.';

  const url = `${SITE_URL}/privacy`;

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

function Privacy() {
  const privacy = allLegals.find((doc) => doc.slug === 'privacy');
  return (
    <main>
      <Suspense fallback={<ArticleLoader />}>
        <Container as="article" className="mt-24 sm:mt-32 lg:mt-40">
          <FadeIn>
            <PageIntro
              centered
              eyebrow="Privacy Policy"
              title={privacy?.title ?? ''}
            >
              <p className="text-muted-foreground">{privacy?.description}</p>
            </PageIntro>
          </FadeIn>

          <FadeIn>
            <div className="prose mx-auto mt-24 dark:prose-invert md:prose-lg sm:mt-32 lg:mt-40">
              <Mdx code={privacy?.body.code ?? ''} />
            </div>
          </FadeIn>
        </Container>
      </Suspense>

      <ContactSection />
    </main>
  );
}

export default Privacy;
