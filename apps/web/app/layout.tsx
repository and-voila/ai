import '@ui/styles/globals.css';

import type { Metadata } from 'next';
import { Suspense } from 'react';

import LandingLayout from '@/components/landing-layout';
import TailwindRwd from '@/components/tailwind-rwd';
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
    'Get started with purpose-built AI for Creators that learns your unique creative style, keeps your process private, and protects your IP. Imagine and voila!',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://andvoila.ai',
    title: 'And Voila AI | AI for creators',
    description:
      'Get started with purpose-built AI for Creators that learns your unique creative style, keeps your process private, and protects your IP. Imagine and voila!',
    siteName: 'And Voila AI',
    images: 'open-graph.jpg',
  },
  referrer: 'origin-when-cross-origin',
  viewport: 'width=device-width, initial-scale=1.0',
  authors: [
    {
      name: 'Team And Voila',
      url: 'https://andvoila.ai',
    },
  ],
  keywords: ['AI for Creators', 'Personalized AI', 'Unique AI Content'],
  creator: 'And Voila AI',
  publisher: 'And Voila AI, Inc.',
  twitter: {
    card: 'summary_large_image',
    site: 'AndVoilaAI',
    title: 'And Voila AI | AI for creators',
    description:
      'Get started with purpose-built AI for Creators that learns your unique creative style, keeps your process private, and protects your IP. Imagine and voila!',
    creator: 'AndVoilaAI',
    images: '/open-graph.jpg',
  },
  icons: [
    {
      rel: 'icon',
      url: '/favicon.ico',
    },
    {
      rel: 'apple',
      url: '/apple-touch-icon.png',
    },
    {
      rel: 'icon',
      url: '/favicon-16x16.png',
      sizes: '16x16',
    },
    {
      rel: 'icon',
      url: '/favicon-32x32.png',
      sizes: '32x32',
    },
    {
      rel: 'icon',
      url: '/favicon-194x194.png',
      sizes: '194x194',
    },
    {
      rel: 'icon',
      url: '/android-chrome-192x192.png',
      sizes: '194x194',
    },
    {
      rel: 'mask-icon',
      url: '/safari-pinned-tab.svg',
      color: '#0811FD',
    },
  ],
  manifest: '/site.webmanifest',
  category: 'technology',
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
          <LandingLayout>
            <Suspense>
              <main>{children}</main>
            </Suspense>
          </LandingLayout>
          <TailwindRwd />
        </ThemeProvider>
      </body>
    </html>
  );
}
