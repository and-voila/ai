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
  logo: <span>And Voila AI Docs</span>,
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
};
