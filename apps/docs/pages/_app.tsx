import type { AppProps } from 'next/app';
import '@ui/styles/globals.css';

export default function Docs({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
