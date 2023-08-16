import { Container } from '@/components/container';
import { FadeIn } from '@/components/fade-in';
import { cn } from 'ui';

interface PageIntroProps {
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  centered?: boolean;
}

export function PageIntro({
  eyebrow,
  title,
  children,
  centered = false,
}: PageIntroProps) {
  return (
    <Container
      className={cn('mt-24 sm:mt-32 lg:mt-40', centered && 'text-center')}
    >
      <FadeIn>
        <h1>
          <span className="block font-display text-base font-medium text-muted-foreground">
            {eyebrow}
          </span>
          <span className="sr-only"> - </span>
          <span
            className={cn(
              'mt-6 block max-w-5xl font-display text-5xl font-medium tracking-tight text-foreground [text-wrap:balance] sm:text-6xl',
              centered && 'mx-auto',
            )}
          >
            {title}
          </span>
        </h1>
        <div
          className={cn(
            'mt-6 max-w-3xl text-lg text-muted-foreground lg:text-xl',
            centered && 'mx-auto',
          )}
        >
          {children}
        </div>
      </FadeIn>
    </Container>
  );
}
