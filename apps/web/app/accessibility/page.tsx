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
  const title = 'Accessibility';
  const description =
    'And Voila AI is committed to continuously improve to meeting WCAG 2.1 AA standards for accessibility to ensure our website is inclusive and usable by all.';

  const url = `${SITE_URL}/accessibility`;

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

function Accessibility() {
  const accessibility = allLegals.find((doc) => doc.slug === 'accessibility');
  return (
    <main>
      <Suspense fallback={<ArticleLoader />}>
        <Container as="article" className="mt-24 sm:mt-32 lg:mt-40">
          <FadeIn>
            <PageIntro
              centered
              eyebrow="Accessibility"
              title={accessibility?.title ?? ''}
            >
              <p className="text-muted-foreground">
                {accessibility?.description}
              </p>
            </PageIntro>
          </FadeIn>

          <FadeIn>
            <div className="prose mx-auto mt-24 dark:prose-invert md:prose-lg sm:mt-32 lg:mt-40">
              <Mdx code={accessibility?.body.code ?? ''} />
            </div>
          </FadeIn>
        </Container>
      </Suspense>
      <ContactSection />
    </main>
  );
}

export default Accessibility;
