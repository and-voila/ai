import React from 'react';

import { allLegals } from '@/.contentlayer/generated';
import { Container } from '@/components/container';
import { FadeIn } from '@/components/fade-in';
import { Mdx } from '@/components/mdx-components';
import { PageIntro } from '@/components/page-intro';
import { ContactSection } from '@/components/sections/home/contact-section';

export const metadata = {
  title: 'Privacy',
  description: 'Our Privacy',
};

function Privacy() {
  const privacy = allLegals.find((doc) => doc.slug === 'privacy');
  return (
    <main>
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
      <ContactSection />
    </main>
  );
}

export default Privacy;
