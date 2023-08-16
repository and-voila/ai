import React from 'react';

import { allLegals } from '@/.contentlayer/generated';
import { Container } from '@/components/container';
import { FadeIn } from '@/components/fade-in';
import { Mdx } from '@/components/mdx-components';
import { PageIntro } from '@/components/page-intro';
import { ContactSection } from '@/components/sections/home/contact-section';

export const metadata = {
  title: 'Terms',
  description: 'Our Terms',
};

function Terms() {
  const terms = allLegals.find((doc) => doc.slug === 'terms');

  return (
    <main>
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
          <div className="prose mx-auto mt-24 dark:prose-invert md:prose-lg sm:mt-32 lg:mt-40">
            <Mdx code={terms?.body.code ?? ''} />
          </div>
        </FadeIn>
      </Container>

      <ContactSection />
    </main>
  );
}

export default Terms;
