import { cn } from 'ui';

import { Container } from '@/components/container';
import { FadeIn } from '@/components/fade-in';

interface SectionIntroProps {
  eyebrow?: string;
  title: string;
  smaller?: boolean;
  className?: string;
  eyebrowColor?: string;
  titleColor?: string;
  childrenColor?: string;
}

export function SectionIntro({
  eyebrow,
  title,
  children,
  smaller = false,
  eyebrowColor,
  titleColor,
  childrenColor,
  ...props
}: SectionIntroProps & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <Container {...props}>
      <FadeIn className="max-w-2xl">
        <h2>
          {eyebrow && (
            <>
              <span
                className={cn(
                  'mb-6 block font-display text-base font-semibold',
                  eyebrowColor,
                )}
              >
                {eyebrow}
              </span>
              <span className="sr-only"> - </span>
            </>
          )}
          <span
            className={cn(
              'block font-display tracking-tight [text-wrap:balance]',
              smaller
                ? 'text-2xl font-semibold'
                : 'text-4xl font-medium sm:text-5xl',
              titleColor,
            )}
          >
            {title}
          </span>
        </h2>
        {children && (
          <div className={cn('mt-6 text-xl', childrenColor)}>{children}</div>
        )}
      </FadeIn>
    </Container>
  );
}

SectionIntro.defaultProps = {
  eyebrowColor: 'text-muted-foreground',
  titleColor: 'text-foreground',
  childrenColor: 'text-muted-foreground',
};
