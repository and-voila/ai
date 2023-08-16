import React from 'react';

import { allLegals } from '@/.contentlayer/generated';
import { Container } from '@/components/container';
import { FadeIn } from '@/components/fade-in';
import { Mdx } from '@/components/mdx-components';
import { PageIntro } from '@/components/page-intro';
import { ContactSection } from '@/components/sections/home/contact-section';

function Mainfesto() {
  const manifesto = allLegals.find((doc) => doc.slug === 'manifesto');
  return (
    <main>
      <Container as="article" className="mt-24 sm:mt-32 lg:mt-40">
        <FadeIn>
          <PageIntro
            centered
            eyebrow="Manifesto"
            title={manifesto?.title ?? ''}
          >
            <p className="text-muted-foreground">{manifesto?.description}</p>
          </PageIntro>
        </FadeIn>

        <FadeIn>
          <div className="prose mx-auto mt-24 dark:prose-invert md:prose-lg sm:mt-32 lg:mt-40">
            <Mdx code={manifesto?.body.code ?? ''} />
          </div>
        </FadeIn>
      </Container>
      <ContactSection />
    </main>
  );
}

export default Mainfesto;
