import { HeartFilledIcon } from 'ui';
import Link from 'next/link';

import { Divider } from '@/components/divider';
import { FadeIn } from '@/components/fade-in';
import { Offices } from '@/components/offices';
import { SocialMedia } from '@/components/social-media';

type LinkType = 'internal' | 'external' | 'email';

type LinkObject = {
  type: LinkType;
  href: string;
};

type Inquiry = {
  label: string;
  link: LinkObject;
  linkText: string;
};

const inquiries: Inquiry[] = [
  {
    label: 'Support',
    link: { type: 'email', href: '123@andvoila.ai' },
    linkText: 'Open a ticket',
  },
  {
    label: 'Careers',
    link: { type: 'external', href: 'https://jobs.andvoila.ai' },
    linkText: "We're hiring",
  },
  {
    label: 'Press',
    link: { type: 'email', href: '123@andvoila.ai' },
    linkText: 'Contact media team',
  },
  {
    label: 'Invest',
    link: { type: 'email', href: '123@andvoila.ai' },
    linkText: 'Request Pitch Deck',
  },
  {
    label: 'Partner',
    link: { type: 'email', href: '123@andvoila.ai' },
    linkText: 'Email partner team',
  },
];

export default function ContactDetails() {
  return (
    <FadeIn>
      <h2 className="font-display text-lg font-semibold text-foreground lg:text-xl">
        Our offices
      </h2>
      <p className="mt-6 text-base text-muted-foreground lg:text-lg">
        Our company is based in Los Angeles. And Voila AI is made with{' '}
        <span className="inline-flex items-center">
          <HeartFilledIcon className="mr-1 h-4 w-4 text-primary" /> from around
          the world.
        </span>
      </p>

      <Offices className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2" />

      <Divider className="mt-16 pt-16">
        <h2 className="font-display text-lg font-semibold text-foreground lg:text-xl">
          Common inquiries?
        </h2>
        <dl className="mt-6 grid grid-cols-1 gap-8 text-sm sm:grid-cols-2">
          {inquiries.map((inquiry) => {
            const { label, link, linkText } = inquiry;
            const href =
              link.type === 'email' ? `mailto:${link.href}` : link.href;
            const isExternal = link.type === 'external';

            return (
              <div key={label}>
                <dt className="text-base font-medium text-foreground lg:text-lg">
                  {label}
                </dt>
                <dd className="flex items-center">
                  <Link
                    href={href}
                    target={isExternal ? '_blank' : undefined}
                    rel={isExternal ? 'noopener noreferrer' : undefined}
                    className="text-base text-muted-foreground hover:text-foreground"
                  >
                    {linkText}
                    <span className="ml-1">&rarr;</span>
                  </Link>
                </dd>
              </div>
            );
          })}
        </dl>
      </Divider>

      <Divider className="mt-16 pt-16">
        <h2 className="font-display text-lg font-semibold text-foreground lg:text-xl">
          Follow us
        </h2>
        <SocialMedia className="mt-6" />
      </Divider>
    </FadeIn>
  );
}
