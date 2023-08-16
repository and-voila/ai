import '@ui/styles/globals.css';
import './custom.css';

import type { AppProps } from 'next/app';

export default function Docs({ Component, pageProps }: AppProps) {
  return (
    <>
      <main lang="en" className="h-full text-base antialiased">
        <style global>{`
          html {
            font-family: 'Mona Sans';
            font-weight: 200 900;
            font-display: block;
            font-style: normal;
            font-stretch: 75% 125%;
            src: url('../../../public/Mona-Sans.var.woff2') format('woff2');
          }
        `}</style>
        <Component {...pageProps} />
      </main>
    </>
  );
}
