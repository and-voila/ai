import React from 'react';
import { MagicWandIcon } from 'ui';

import { allPosts } from '@/.contentlayer/generated';
import { Container } from '@/components/container';
import Cta from '@/components/cta';
import { FadeIn } from '@/components/fade-in';
import { Mdx } from '@/components/mdx-components';
import { PageLinks } from '@/components/page-links';
import { formattedDate } from '@/components/utils';

interface MdxSlugPageProps {
  params: {
    slug: string;
  };
}

function MdxSlugPage({ params }: MdxSlugPageProps) {
  const mdx = allPosts.find((doc) => doc.slug === params.slug);
  const moreMdx = allPosts.filter((doc) => doc.slug !== params.slug);
  return (
    <>
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
