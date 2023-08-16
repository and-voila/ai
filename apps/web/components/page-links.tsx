import { ArrowRightIcon, cn } from 'ui';
import Link from 'next/link';

import { Container } from '@/components/container';
import { Divider } from '@/components/divider';
import { FadeIn, FadeInStagger } from '@/components/fade-in';
import { GridPattern } from '@/components/grid-pattern';
import { SectionIntro } from '@/components/section-intro';

import { formattedDate } from './utils';

interface PageLinkProps {
  title: string;
  description: string;
  slug: string;
  date?: string;
}

interface PageLinksProps {
  title: string;
  intro?: string;
  pages: PageLinkProps[];
  className?: string;
}

function PageLink({ date, description, slug, title }: PageLinkProps) {
  const formattedDateStr = formattedDate(date);

  return (
    <article key={slug}>
      <Divider
        position="left"
        className="relative flex flex-col items-start pl-8"
      >
        <h3 className=" mt-6 font-display text-base font-semibold text-foreground md:text-lg">
          {title}
        </h3>
        <time
          dateTime={date}
          className="order-first text-sm text-muted-foreground"
        >
          {formattedDateStr}
        </time>
        <p className="mt-2.5 text-base text-muted-foreground">{description}</p>
        <Link
          href={slug}
          className="hover:text-muted-foreground50 mt-6 flex items-center gap-x-3 text-base font-semibold text-foreground transition"
          aria-label={`Read more: ${title}`}
        >
          Read more
          <ArrowRightIcon className="w-6 flex-none fill-current" />
          <span className="absolute inset-0" />
        </Link>
      </Divider>
    </article>
  );
}

export function PageLinks({ title, intro, pages, className }: PageLinksProps) {
  const sortedPages = pages.slice().sort((a, b) => {
    if (!a.date || !b.date) {
      return 0;
    }
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  const recentPages = sortedPages.slice(0, 4);

  return (
    <div className={cn('relative pt-24 sm:pt-32 lg:pt-40', className)}>
      <div className="bg-gradient-to-background absolute inset-x-0 top-0 -z-10 min-h-[700px] overflow-hidden rounded-t-4xl from-slate-50">
        <GridPattern
          className="absolute inset-x-0 -top-14 -z-10 h-[1000px] w-full fill-slate-100 stroke-slate-100 [mask-image:linear-gradient(to_bottom_left,white_40%,transparent_50%)] dark:fill-primary dark:stroke-slate-500 dark:opacity-10"
          yOffset={-270}
          interactive
        />
      </div>

      <SectionIntro title={title} smaller>
        {intro && <p className="text-muted-foreground">{intro}</p>}
      </SectionIntro>

      <Container className={intro ? 'mt-24' : 'mt-16'}>
        <FadeInStagger className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
          {recentPages.map((page) => (
            <FadeIn key={page.slug}>
              <PageLink {...page} />
            </FadeIn>
          ))}
        </FadeInStagger>
      </Container>
    </div>
  );
}
