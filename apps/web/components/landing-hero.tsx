'use client';
import Link from 'next/link';
import React from 'react';
import { Button, MagicWandIcon, RocketIcon } from 'ui';

import { Container } from './container';
import { FadeIn } from './fade-in';

export const LandingHero = () => {
  return (
    <Container className="mt-24 sm:mt-32 md:mt-56">
      <FadeIn className="max-w-3xl">
        <div className="hidden sm:mb-8 sm:flex">
          <div className="relative flex items-center rounded-md px-3 py-1 text-xs leading-6 text-muted-foreground ring-1 ring-muted lg:text-sm">
            <p className="mr-2 flex items-center">
              <RocketIcon className="mr-2 h-4 w-4" />
              We raised a $500K pre-seed.{' '}
            </p>
            <Link
              href="/mdx/and-voila-ai-raises-pre-seed"
              className="text-sm text-xs font-bold text-muted-foreground hover:text-foreground lg:text-sm "
            >
              <span className="absolute inset-0" aria-hidden="true" />
              Read more <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
        <h1 className="font-display text-4xl font-medium tracking-tight text-foreground [text-wrap:balance] sm:text-6xl">
          Transcend the generative noise, because the world needs you
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground lg:text-xl">
          Captivate your audience with content only you can make. Level up your
          creative process with AI that learns your style, keeps everything
          private, and protects your IP. Made for creators, by creators.
        </p>
        <Link href="https://app.andvoila.ai/sign-up">
          <Button
            variant="default"
            className="mt-6 lg:mt-8"
            aria-label="Sign Up"
          >
            <p>Get Started</p>
            <MagicWandIcon className="ml-2 h-4 w-4" />
          </Button>
        </Link>
        <p className="mt-4 text-xs font-normal text-muted-foreground md:text-sm">
          No credit card required.
        </p>
      </FadeIn>
    </Container>
  );
};
