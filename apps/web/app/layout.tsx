import LandingLayout from '@/components/landing-layout';
import '@ui/styles/globals.css';

import type { Metadata } from 'next';

import { ThemeProvider } from '@/components/theme-provider';

export const metadata: Metadata = {
  metadataBase: new URL('https://andvoila.ai'),
  alternates: {
    canonical: 'https://andvoila.ai',
  },
  title: {
    default: 'And Voila AI | AI for Creators',
    template: '%s | And Voila AI',
  },
  description:
    "AI for creators—Transform your content with And Voila's AI.Building a less boring future for creators and influencers.Join us, we're hiring! 🍩",
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://andvoila.ai',
    title: 'And Voila AI | AI for creators',
    description:
      "AI for creators—Transform your content with And Voila's AI.Building a less boring future for creators and influencers.Join us, we're hiring! 🍩",
    siteName: 'And Voila AI',
    images: '/og.png',
  },
  referrer: 'origin-when-cross-origin',
  viewport: 'width=device-width, initial-scale=1.0',
  authors: [
    {
      name: 'And Voila AI',
      url: 'https://andvoila.ai',
    },
  ],
  keywords: ['ChatGPT newsletter', 'AI newsletter', 'artifical intelligence'],
  creator: 'And Voila AI',
  publisher: 'And Voila AI, Inc.',
  twitter: {
    card: 'summary_large_image',
    site: 'AndVoilaAI',
    title: 'And Voila AI | AI for creators',
    description:
      "AI for creators—Transform your content with And Voila's AI.Building a less boring future for creators and influencers.Join us, we're hiring! 🍩",
    creator: 'AndVoilaAI',
    images: '/og.png',
  },
  icons: [
    {
      rel: 'icon',
      url: '/app/favicon.ico',
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full text-base antialiased">
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <LandingLayout>{children}</LandingLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}
