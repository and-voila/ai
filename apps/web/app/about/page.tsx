import { Metadata } from 'next';
import dynamic from 'next/dynamic';
import React, { Suspense } from 'react';
import { HomeIcon } from 'ui';

import { allPosts } from '@/.contentlayer/generated';
import { Container } from '@/components/container';
import Cta from '@/components/cta';
import Features from '@/components/features';
import { PageIntro } from '@/components/page-intro';
import Culture from '@/components/sections/about/culture';
import { ContactSection } from '@/components/sections/home/contact-section';
import { SITE_URL } from '@/lib/constants';

const PageLinks = dynamic(() =>
  import('@/components/page-links').then((mod) => mod.PageLinks),
);

export function generateMetadata(): Metadata {
  const title = 'About Us';
  const description =
    'And Voila AI helps your create unique AI content that stands out from the generative noise. Protect your IP from the bots and posers with an AI assisted flow.';

  const url = `${SITE_URL}/about`;

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

const featuresSection = {
  eyebrow: 'Transparency and Sustainability',
  title: 'Not just talking the talk',
  className: 'mt-24 sm:mt-32 lg:mt-40',
  intro: [
    ' Enough with the status quo. At And Voila AI, we&apos;re disrupting tech with our unique blend of 100% open-source and team ownership. Profit matters, but not at the expense of our stakeholders or the planet. We proudly commit 1% of our gross revenue to fight climate change.',
    'After all, doing good is the first step to doing well.',
  ],
  listItems: [
    {
      title: 'Open source',
      content:
        "We're 100% open source, embracing transparency and community collaboration. Our code is your code.",
    },
    {
      title: 'Team owned',
      content:
        'Ownership extends to every team member, aligning our goals and fostering pride and responsibility.',
    },
    {
      title: 'Remote-friendly',
      content:
        "Work where you thrive. We support flexibility, whether it's at home or a beachside café.",
    },
    {
      title: 'For the environment',
      content:
        'We pledge 1% of our revenue to fight global warming. Success shouldn’t compromise the planet.',
    },
  ],
};

function About() {
  return (
    <main>
      <Suspense>
        <PageIntro eyebrow="About" title="A world where imagination thrives">
          <p className="text-muted-foreground">
            We live in an era of exponential technological change. Recent
            advances in AI and generative media promise to reshape our world yet
            again.
          </p>
          <div className="mt-10 max-w-2xl space-y-6 text-base text-muted-foreground lg:text-lg">
            <p>
              While this coming disruption evokes uncertainty, we see tremendous
              possibility. We believe artificial intelligence should inspire,
              not replace, the wonders of natural human creativity.
            </p>
            <p>
              At And Voila, our animating purpose is to build a future where
              human imagination continues to thrive amidst emerging
              technologies. We envision an uplifting world where AI amplifies,
              rather than overwhelms, the creative spirit within us all.
            </p>
            <p>
              The proliferation of generative content may make our world feel
              increasingly homogenized. But we find hope in diversity. We
              believe creative minds like you have a vital role to play in
              shaping our collective future.
            </p>
            <p>
              Our tools aim to support human ingenuity, not supplant it. We are
              steadfast in our conviction that the boldest breakthroughs will
              happen when human and artificial intelligences work in
              harmony—achieving together what neither could alone.
            </p>
          </div>
        </PageIntro>

        <Culture />

        <Suspense fallback={<div>loading...</div>}>
          <Features section={featuresSection} />
        </Suspense>
        <Container>
          <Cta
            title="Join the change"
            text="Ready to make a real impact? Join our team and contribute to a more open and sustainable future."
            linkHref="https://jobs.andvoila.ai"
            buttonText="See Open Roles"
            buttonIcon={<HomeIcon />}
            footerText="Be part of our mission"
          />
        </Container>

        <PageLinks
          className="mt-24 sm:mt-32 lg:mt-40"
          title="From the blog"
          intro="Discover the latest trends, innovations, and insights from our thought leaders. Our blog is more than just updates; it's a resource for knowledge and inspiration tailored for creators, innovators, and dreamers like you."
          pages={...allPosts.map((post) => ({
            title: post.title,
            description: post.description,
            slug: `/mdx/${post.slug}`,
            date: post.date,
          }))}
        />

        <ContactSection />
      </Suspense>
    </main>
  );
}

export default About;
