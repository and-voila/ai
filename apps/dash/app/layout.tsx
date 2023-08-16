import '../../../packages/ui/styles/globals.css';

import { ClerkProvider } from '@clerk/nextjs';

import { ModalProvider } from '../components/modal-provider';
import { ThemeProvider } from '../components/theme-provider';
import { ToasterProvider } from '../components/toaster-provider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" className="h-full text-base antialiased">
        <body>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
            <ModalProvider />
            <ToasterProvider />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
