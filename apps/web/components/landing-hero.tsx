'use client';
import Link from 'next/link';
import React from 'react';
import { RocketIcon } from 'ui';

import { Container } from './container';
import { FadeIn } from './fade-in';

export const LandingHero = () => {
  return (
    <Container className="mt-24 sm:mt-32 md:mt-56">
      <FadeIn className="max-w-3xl">
        <div className="hidden sm:mb-8 sm:flex">
          <div className="relative flex items-center rounded-md px-3 py-1 text-sm leading-6 text-muted-foreground ring-1 ring-muted">
            <p className="mr-2 flex items-center">
              <RocketIcon className="mr-2 h-4 w-4" />
              We raised a $500K pre-seed.{' '}
            </p>
            <Link
              href="/mdx/and-voila-ai-raises-pre-seed"
              className="text-sm font-medium text-muted-foreground"
            >
              <span className="absolute inset-0" aria-hidden="true" />
              Read more <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
        <h1 className="font-display text-4xl font-medium tracking-tight text-foreground [text-wrap:balance] sm:text-6xl">
          Transcend the generative noise, because the world needs you
        </h1>
        <p className="mt-6 text-xl leading-relaxed text-muted-foreground">
          Captivate your audience with content only you can make. Level up your
          creative process with AI that learns your style, keeps everything
          private, and protects your IP. Made for creators, by creators.
        </p>
        <div className="mt-6">
          <Link
            className="font-medium text-muted-foreground"
            href="https://jobs.andvoila.ai/"
            target="_blank"
          >
            We&apos;re hiring <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
        {/*We'll make this active later*/}
        {/*<Button variant="default" className="mt-6">
          <p>Coming Soon</p>
          <MagicWandIcon className="ml-2 h-4 w-4" />
        </Button>
        <p className="mt-4 text-muted-foreground text-xs md:text-sm font-normal">
          No credit card required.
        </p>*/}
      </FadeIn>
    </Container>
  );
};
