import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { Button, MagicWandIcon } from 'ui';

import { allPosts } from '@/.contentlayer/generated';
import { Container } from '@/components/container';
import Cta from '@/components/cta';
import { Divider } from '@/components/divider';
import { FadeIn } from '@/components/fade-in';
import { MDXListLoader } from '@/components/loaders';
import { PageIntro } from '@/components/page-intro';
import { formattedDate } from '@/components/utils';
import { SITE_URL } from '@/lib/constants';

export function generateMetadata(): Metadata {
  const title = 'Blog';
  const description =
    "Stay up to date with the latest tips, tricks, and insights from the And Voila Team. We'll help you unlock your creativity with AI to delight your audience.";

  const url = `${SITE_URL}/mdx`;
  const openGraphImage = '/open-graph.jpg';

  const metadata = {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: openGraphImage,
    },
    twitter: {
      title,
      description,
      images: openGraphImage,
    },
  };

  return metadata;
}

export default function MdxPage() {
  const sortedPosts = allPosts.slice().sort((a, b) => {
    if (!a.date || !b.date) {
      return 0;
    }
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
  return (
    <>
      <PageIntro eyebrow="Blog" title="Insights to unlock creativity">
        <p>
          Stay inspired and informed with the latest articles on leveraging AI
          to augment human imagination. Get tips from creative pros on taking
          your skills to new heights.
        </p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <div className="space-y-24 lg:space-y-32">
          <Suspense fallback={<MDXListLoader />}>
            {sortedPosts.map((article) => (
              <FadeIn key={article.slug}>
                <article>
                  <Divider className="pt-16">
                    <div className="relative lg:-mx-4 lg:flex lg:justify-end">
                      <div className="pt-10 lg:w-2/3 lg:flex-none lg:px-4 lg:pt-0">
                        <h2 className="font-display text-4xl font-medium text-foreground">
                          <Link href={`/mdx/${article.slug}`}>
                            {article.title}
                          </Link>
                        </h2>
                        <dl className="lg:absolute lg:left-0 lg:top-0 lg:w-1/3 lg:px-4">
                          <dt className="sr-only">Published</dt>
                          <dd className="absolute left-0 top-0 text-sm text-muted-foreground lg:static lg:text-base">
                            {article.date && (
                              <time dateTime={article.date}>
                                {formattedDate(article.date)}{' '}
                              </time>
                            )}
                          </dd>
                          <dt className="sr-only">Author</dt>
                          <dd className="mt-6 flex gap-x-4">
                            <div className="max-h-12 flex-none overflow-hidden rounded-lg bg-slate-500 dark:bg-slate-800">
                              <Image
                                alt="And Voila Team Icon"
                                src="/av-icon-light.png"
                                className="h-12 w-12 object-cover p-2 grayscale"
                                width={48}
                                height={48}
                              />
                            </div>
                            <div className="text-sm text-foreground lg:text-base">
                              <div className="font-medium ">And Voila AI</div>
                              <div className="text-muted-foreground">
                                Communications
                              </div>
                            </div>
                          </dd>
                        </dl>
                        <p className="mt-6 max-w-2xl text-base text-muted-foreground lg:text-lg">
                          {article.description}
                        </p>
                        <Button
                          variant="premium"
                          aria-label={`Read more: ${article.title}`}
                          className="mt-8"
                        >
                          <Link href={`/mdx/${article.slug}`}>
                            {article.readMoreButtonText}
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </Divider>
                </article>
              </FadeIn>
            ))}
          </Suspense>
        </div>
      </Container>

      <Cta
        title="Power up your creativity"
        text="See firsthand how And Voila AI can enhance your creative process. Sign up now and try for yourself."
        linkHref="https://app.andvoila.ai/sign-up"
        buttonText="Sign Up Free"
        buttonIcon={<MagicWandIcon />}
        footerText="No credit card required"
      />
    </>
  );
}
