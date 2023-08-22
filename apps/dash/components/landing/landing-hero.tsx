import Link from 'next/link';
import { Button } from 'ui';

import { FadeIn } from './fade-in';

const LandingHero = () => {
  return (
    <FadeIn className="mt-24 max-w-3xl">
      <h1 className="font-display text-4xl font-medium tracking-tight text-foreground [text-wrap:balance] sm:text-6xl">
        Get started free
      </h1>
      <p className="mt-6 text-xl text-muted-foreground">
        And Voila AI is the smartest intern on the planet. It keeps your
        creative process private, and protects your IP. Get started today, no
        credit card required.
      </p>
      <div>
        <Button variant="default" className="mt-8 rounded-md text-lg" size="lg">
          <Link href={'/sign-up'}>Sign Up</Link>
        </Button>
        <p className="mt-8 text-xs lg:text-sm">
          Already have an account?
          <Link href="/sign-in" className="ml-1 font-semibold text-brand">
            Sign In
          </Link>
        </p>
      </div>
    </FadeIn>
  );
};

export default LandingHero;
