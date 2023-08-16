import type { AppProps } from 'next/app';
import '@ui/styles/globals.css';

export default function Docs({ Component, pageProps }: AppProps) {
  return (
    <main lang="en" className="h-full text-base antialiased">
      <Component {...pageProps} />
    </main>
  );
}
