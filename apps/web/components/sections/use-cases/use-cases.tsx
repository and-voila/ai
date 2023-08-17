import Link from 'next/link';
import React, { Suspense } from 'react';
import { Button, ReactIcon } from 'ui';

import { UseCase } from '@/.contentlayer/generated';
import { Blockquote } from '@/components/blockquote';
import { Container } from '@/components/container';
import { Divider } from '@/components/divider';
import { FadeIn } from '@/components/fade-in';
import { MDXListLoader } from '@/components/loaders';
import { formattedDate } from '@/components/utils';

const UseCaseHeader: React.FC<{ useCase: UseCase }> = ({ useCase }) => {
  const isValidIcon = ReactIcon?.hasOwnProperty(useCase.icon);
  const UseCaseIcon = isValidIcon
    ? ReactIcon[useCase.icon as keyof typeof ReactIcon]
    : null;

  return (
    <div className="sm:flex sm:items-center sm:gap-x-6 lg:block">
      {UseCaseIcon && (
        <UseCaseIcon className="h-8 w-8 text-muted-foreground lg:h-12 lg:w-12" />
      )}
      <h3 className="mt-6 font-display text-4xl font-semibold text-foreground sm:mt-0 lg:mt-8">
        {useCase.feature}
      </h3>
      <div className="mt-1 flex gap-x-4 sm:mt-0 lg:block">
        <p className="text-sm text-muted-foreground lg:mt-2">
          {useCase.date && (
            <time dateTime={useCase.date}>{formattedDate(useCase.date)}</time>
          )}
        </p>
      </div>
    </div>
  );
};

const UseCaseContent: React.FC<{ useCase: UseCase }> = ({ useCase }) => {
  return (
    <div className="col-span-full lg:col-span-2 lg:max-w-2xl">
      <p className="font-display text-4xl font-medium text-foreground">
        <Link href={`/use-cases/${useCase.slug}`}>{useCase.title}</Link>
      </p>
      <div className="mt-6 space-y-6 text-base text-muted-foreground md:text-lg">
        <p>{useCase.description}</p>
      </div>
      <div className="mt-8 flex">
        <Button
          variant="premium"
          aria-label={`Read case study: ${useCase.title}`}
        >
          <Link href={`/use-cases/${useCase.slug}`}>{useCase.buttonText}</Link>
        </Button>
      </div>
      {useCase.testimonialAuthor && useCase.testimonialAuthorRole && (
        <Blockquote
          author={{
            name: useCase.testimonialAuthor,
            role: useCase.testimonialAuthorRole,
          }}
          className="mt-12 rounded-md border p-4"
        >
          {useCase.testimonial}
        </Blockquote>
      )}
    </div>
  );
};

const UseCaseArticle: React.FC<{ useCase: UseCase }> = ({ useCase }) => {
  return (
    <FadeIn key={useCase._id}>
      <article>
        <Divider className="grid grid-cols-3 gap-x-8 gap-y-8 pt-16">
          <div className="col-span-full sm:flex sm:items-center sm:justify-between sm:gap-x-8 lg:col-span-1 lg:block">
            <UseCaseHeader useCase={useCase} />
          </div>
          <div className="col-span-full lg:col-span-2 lg:max-w-2xl">
            <UseCaseContent useCase={useCase} />
          </div>
        </Divider>
      </article>
    </FadeIn>
  );
};

const UseCases: React.FC<{ useCases: UseCase[] }> = ({ useCases }) => {
  const sortedUseCases = useCases.slice().sort((a, b) => {
    if (!a.date || !b.date) {
      return 0;
    }
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return (
    <Container className="mt-40">
      <FadeIn>
        <h2 className="font-display text-2xl font-semibold text-foreground">
          How visionaries use And Voila
        </h2>
      </FadeIn>
      <div className="mt-10 space-y-20 sm:space-y-24 lg:space-y-32">
        <Suspense fallback={<MDXListLoader />}>
          {sortedUseCases.map((useCase) => (
            <UseCaseArticle useCase={useCase} key={useCase._id} />
          ))}
        </Suspense>
      </div>
    </Container>
  );
};

export default UseCases;
