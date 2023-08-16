'use client';

/* eslint-disable prefer-const */
import Image from 'next/image';

import { Container } from '@/components/container';
import { FadeIn } from '@/components/fade-in';
import { GridPattern } from '@/components/grid-pattern';
import { cn } from 'ui';

interface TestimonialProps {
  children: React.ReactNode;
  client: {
    logo: string;
    name: string;
  };
  className?: string;
}

export function Testimonial({ children, client, className }: TestimonialProps) {
  return (
    <div
      className={cn(
        'relative isolate h-auto bg-primary py-16 sm:py-28 md:py-32',
        className,
      )}
    >
      <GridPattern
        className="absolute inset-x-0 -top-14 -z-10 h-[1000px] w-full fill-slate-400/25 stroke-slate-950/10 [mask-image:linear-gradient(to_bottom_left,white_30%,transparent_40%)] dark:fill-slate-950/10 dark:stroke-slate-900/10"
        yOffset={-96}
        interactive
      />
      <Container>
        <FadeIn>
          <figure className="mx-auto max-w-4xl">
            <blockquote className="leading-looser relative font-display text-slate-50 sm:text-4xl md:text-5xl">
              <p className="before:content-['“'] after:content-['”'] sm:before:absolute sm:before:right-full">
                {children}
              </p>
            </blockquote>
            <figcaption className="mt-10 flex items-center">
              <Image
                className="rounded-full grayscale hover:grayscale-0"
                src={client.logo}
                alt={client.name}
                unoptimized
                width={64}
                height={64}
              />
              <p className="ml-4 font-display text-xl font-semibold text-slate-200">
                {client.name}
              </p>
            </figcaption>
          </figure>
        </FadeIn>
      </Container>
    </div>
  );
}
