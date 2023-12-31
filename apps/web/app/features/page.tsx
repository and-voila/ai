import { Metadata } from 'next';
import React from 'react';
import { MagicWandIcon } from 'ui';

import Cta from '@/components/cta';
import { PageIntro } from '@/components/page-intro';
import CoCreator from '@/components/sections/features/co-creator';
import Coding from '@/components/sections/features/coding';
import Learns from '@/components/sections/features/learns-style';
import Multimedia from '@/components/sections/features/mulltimedia';
import Multiplayer from '@/components/sections/features/multiplayer';
import Privacy from '@/components/sections/features/privacy';
import Writing from '@/components/sections/features/writing';
import { SITE_URL } from '@/lib/constants';

export function generateMetadata(): Metadata {
  const title = 'Features';
  const description =
    'You need an AI suite purpose-built for your creative process. One that helps you do what you do best. Create content that makes your audience go whoop!';

  const url = `${SITE_URL}/features`;

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

function Features() {
  return (
    <>
      <PageIntro eyebrow="Features" title="You start And Voila will finish">
        <p>
          Ever wish you had a co-creator that could supercharge your
          imagination? One that could help make your bold ideas become reality?
          And Voila is that spark you&apos;ve been looking for. It instantly
          grasps your unique style and perspective. Together, you&apos;ll bring
          your most creative ideas to life like you never thought possible.
          It&apos;s time to create fearlessly again.
        </p>
      </PageIntro>

      <div className="mt-24 space-y-24 [counter-reset:section] sm:mt-32 sm:space-y-32 lg:mt-40 lg:space-y-40">
        <Learns />
        <CoCreator />
        <Writing />
        <Multimedia />
        <Coding />
        <Privacy />
        <Multiplayer />
      </div>

      <Cta
        title="Power up your creativity"
        text="See firsthand how And Voila AI can enhance your creative process. Sign up now and try for yourself."
        linkHref="https://app.andvoila.aihttps://app.andvoila.ai/sign-up"
        buttonText="Sign Up Free"
        buttonIcon={<MagicWandIcon />}
        footerText="No credit card required"
      />
    </>
  );
}

export default Features;
