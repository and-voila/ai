import React from 'react';

import { allLegals } from '@/.contentlayer/generated';
import { Container } from '@/components/container';
import { FadeIn } from '@/components/fade-in';
import { Mdx } from '@/components/mdx-components';
import { PageIntro } from '@/components/page-intro';
import { ContactSection } from '@/components/sections/home/contact-section';

function Accessibility() {
  const accessibility = allLegals.find((doc) => doc.slug === 'accessibility');
  return (
    <main>
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
      <ContactSection />
    </main>
  );
}

export default Accessibility;
