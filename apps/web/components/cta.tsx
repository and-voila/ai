import Link from 'next/link';
import React from 'react';

import { Container } from './container';
import { FadeIn } from './fade-in';
import { Button } from 'ui';

interface CtaProps {
  title: string;
  text: string;
  linkHref: string;
  buttonText: string;
  buttonIcon: React.ReactNode;
  footerText: string;
}

const Cta: React.FC<CtaProps> = ({
  title,
  text,
  linkHref,
  buttonText,
  buttonIcon,
  footerText,
}) => {
  return (
    <Container>
      <FadeIn className="mt-24 rounded-[40px] bg-primary sm:mt-32 lg:mt-40">
        <div className="px-6 py-24 sm:mx-0 sm:px-6 sm:py-32 md:px-12 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-4xl font-medium text-slate-50 sm:text-6xl">
              {title}
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-slate-100 md:text-xl ">
              {text}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link href={linkHref}>
                <Button
                  variant="cta"
                  size="lg"
                  className="mt-4 w-full justify-between font-display font-semibold"
                >
                  <div className="flex items-center text-lg">
                    <div className="mr-4">{buttonText}</div>
                    {buttonIcon}
                  </div>
                </Button>
              </Link>
            </div>
            <p className="mx-auto mt-6 max-w-xl text-xs text-slate-100 md:text-sm">
              {footerText}
            </p>
          </div>
        </div>
      </FadeIn>
    </Container>
  );
};

export default Cta;
