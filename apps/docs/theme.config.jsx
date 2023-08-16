import { useRouter } from 'next/router';
import { useConfig } from 'nextra-theme-docs';

const HeadComponent = () => {
  const { asPath, defaultLocale, locale } = useRouter();
  const { frontMatter } = useConfig();
  const url =
    'https://andvoila.ai/docs' +
    (defaultLocale === locale ? asPath : `/${locale}${asPath}`);

  return (
    <>
      <meta property="og:url" content={url} />
      <meta
        property="og:title"
        content={frontMatter.title || 'And Voila Docs'}
      />
      <meta
        property="og:description"
        content={
          frontMatter.description ||
          'Explore the official documentation for And Voila AI designed to empower creators. Access user guides and developer resources to enhance your workflow.'
        }
      />
    </>
  );
};

export default {
  head: HeadComponent,
  logo: <strong>And Voila Docs</strong>,
  project: {
    link: 'https://github.com/and-voila/and-voila/tree/main/apps/docs',
  },
  docsRepositoryBase:
    'https://github.com/and-voila/and-voila/tree/main/apps/docs',
  useNextSeoProps() {
    const { asPath } = useRouter();
    if (asPath !== '/') {
      return {
        titleTemplate: '%s – And Voila Docs',
      };
    }
  },
  chat: {
    link: 'https://twitter.com/AndVoilaAI_',
    icon: (
      <svg width="24" height="24" viewBox="0 0 248 204">
        <path
          fill="currentColor"
          d="M221.95 51.29c.15 2.17.15 4.34.15 6.53 0 66.73-50.8 143.69-143.69 143.69v-.04c-27.44.04-54.31-7.82-77.41-22.64 3.99.48 8 .72 12.02.73 22.74.02 44.83-7.61 62.72-21.66-21.61-.41-40.56-14.5-47.18-35.07a50.338 50.338 0 0 0 22.8-.87C27.8 117.2 10.85 96.5 10.85 72.46v-.64a50.18 50.18 0 0 0 22.92 6.32C11.58 63.31 4.74 33.79 18.14 10.71a143.333 143.333 0 0 0 104.08 52.76 50.532 50.532 0 0 1 14.61-48.25c20.34-19.12 52.33-18.14 71.45 2.19 11.31-2.23 22.15-6.38 32.07-12.26a50.69 50.69 0 0 1-22.2 27.93c10.01-1.18 19.79-3.86 29-7.95a102.594 102.594 0 0 1-25.2 26.16z"
        />
      </svg>
    ),
  },
  darkMode: true,
  banner: {
    key: 'announce',
    text: (
      <a
        href="https://andvoila.ai/mdx/and-voila-ai-raises-pre-seed"
        target="_blank"
      >
        🎉 And Voila AI beta just launched. Read more →
      </a>
    ),
  },
  footer: {
    text: (
      <span>
        MIT {new Date().getFullYear()} ©{' '}
        <a href="https://andvoila.ai" target="_blank">
          And Voila AI, Inc.
        </a>
        .
      </span>
    ),
  },
  navigation: true,
};
