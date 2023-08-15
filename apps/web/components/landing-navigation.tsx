import Link from 'next/link';

import { Container } from '@/components/container';

function NavigationRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-brand even:mt-px">
      <Container>
        <div className="grid grid-cols-1 sm:grid-cols-2">{children}</div>
      </Container>
    </div>
  );
}

function NavigationItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="group relative isolate -mx-6 bg-brand px-6 py-10 even:mt-px hover:text-gray-950 sm:mx-0 sm:px-0 sm:py-16 sm:odd:pr-16 sm:even:mt-0 sm:even:border-l sm:even:border-gray-50 sm:even:pl-16"
    >
      {children}
      <span className="absolute inset-y-0 -z-10 w-screen bg-gray-50 opacity-0 transition group-odd:right-0 group-even:left-0 group-hover:opacity-100" />
    </Link>
  );
}

export default function Navigation() {
  return (
    <nav className="mt-px font-display text-5xl font-medium tracking-tight text-gray-50">
      <NavigationRow>
        <NavigationItem href="/pricing">Pricing</NavigationItem>
        <NavigationItem href="/features">Features</NavigationItem>
      </NavigationRow>
      <NavigationRow>
        <NavigationItem href="/use-cases">Use Cases</NavigationItem>
        <NavigationItem href="/mdx">Blog</NavigationItem>
      </NavigationRow>
    </nav>
  );
}
