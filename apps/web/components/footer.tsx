import Link from 'next/link';

import { Container } from '@/components/container';
import { FadeIn } from '@/components/fade-in';
import { socialMediaProfiles } from '@/components/social-media';

import { Logo, Logomark } from '@/components/logo';
import { ModeToggle } from './mode-toggle';
import { Button, Input } from 'ui';

const navigation: {
  title: string;
  links: {
    title: string | JSX.Element;
    href: string;
    external?: boolean;
  }[];
}[] = [
  {
    title: 'Product',
    links: [
      { title: 'Features', href: '/features' },
      { title: 'Use Cases', href: '/use-cases' },
      { title: 'Pricing', href: '/pricing' },
      { title: 'Support', href: '/contact' },
    ].map((link) => ({ ...link, external: false })),
  },
  {
    title: 'Developers',
    links: [
      { title: 'Docs', href: '/' },
      { title: 'Open Source', href: '/' },
      { title: 'Research', href: '/' },
    ].map((link) => ({ ...link, external: false })),
  },
  {
    title: 'Company',
    links: [
      { title: 'Blog', href: '/mdx' },
      { title: 'About', href: '/about' },
      { title: 'Contact', href: '/contact' },
      { title: 'Built With', href: '/' },
    ].map((link) => ({ ...link, external: false })),
  },
  {
    title: 'Legal',
    links: [
      { title: 'Accessibility', href: '/accessibility' },
      { title: 'Privacy', href: '/privacy' },
      { title: 'Terms', href: '/terms' },
    ].map((link) => ({ ...link, external: false })),
  },
  {
    title: 'Connect',
    links: socialMediaProfiles.map((link) => ({ ...link, external: true })),
  },
];

function Navigation() {
  return (
    <nav>
      <ul role="list" className="grid grid-cols-2 gap-28 sm:grid-cols-5">
        {navigation.map((section) => (
          <li key={section.title}>
            <div className="font-display font-semibold tracking-wider text-foreground">
              {section.title}
            </div>
            <ul role="list" className="mt-4 text-sm text-muted-foreground">
              {section.links.map((link, i) => (
                <li key={i} className="mt-4">
                  <Link
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="whitespace-nowrap transition hover:text-foreground"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </nav>
  );
}

function NewsletterForm() {
  return (
    <form className="max-w-sm">
      <h2 className="font-display text-sm font-semibold tracking-wider text-foreground">
        Sign up for our newsletter
      </h2>
      <p className="mt-4 text-sm text-foreground">
        Subscribe to get the latest design news, articles, resources and
        inspiration.
      </p>
      <div className="mt-4 flex w-full max-w-sm items-center space-x-2">
        <Input
          type="email"
          placeholder="Email"
          className="rounded-md border border-input bg-background px-3 py-1 text-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-100"
        />
        <Button type="submit" variant="default">
          Subscribe
        </Button>
      </div>
    </form>
  );
}

export function Footer() {
  return (
    <Container as="footer" className="mt-24 w-full sm:mt-32 lg:mt-40">
      <FadeIn>
        <div className="grid grid-cols-1 gap-x-8 gap-y-16 lg:grid-cols-2">
          <Navigation />

          <div className="flex lg:justify-end">
            <NewsletterForm />
          </div>
        </div>
        <div className="mb-5 mt-24 flex w-full justify-end">
          <ModeToggle />
        </div>
        <div className="mb-20 flex flex-wrap items-end justify-between gap-x-6 gap-y-4 border-t border-muted pt-12">
          <Link href="/" aria-label="Home">
            <Logomark className="h-9 sm:hidden" />
            <Logo className="hidden h-9 sm:block" fillOnHover />
          </Link>
          <p className="text-sm text-foreground">
            © {new Date().getFullYear()} And Voila AI, Inc. All rights
            reserved.
          </p>
        </div>
      </FadeIn>
    </Container>
  );
}
