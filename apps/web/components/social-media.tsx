import {
  GitHubLogoIcon,
  LinkedInLogoIcon,
  NotionLogoIcon,
  TwitterLogoIcon,
} from 'ui';
import Link from 'next/link';

export const socialMediaProfiles = [
  {
    title: 'GitHub',
    href: 'https://github.com/and-voila',
    icon: GitHubLogoIcon,
  },
  {
    title: 'Twitter',
    href: 'https://twitter.com/AndVoilaAI',
    icon: TwitterLogoIcon,
  },
  {
    title: 'Notion',
    href: 'https://aquamarine-cod-be0.notion.site/Vision-to-Values-a988526a199c4a09a86f0dd36eb7e1a1?pvs=4',
    icon: NotionLogoIcon,
  },
  {
    title: 'LinkedIn',
    href: 'https://linkedin.com/company/andvoila',
    icon: LinkedInLogoIcon,
  },
];

interface SocialMediaProps {
  className?: string;
  invert?: boolean;
}

export function SocialMedia({
  className = '',
  invert = false,
}: SocialMediaProps) {
  const defaultColor = invert ? 'text-gray-50' : 'text-foreground';
  const hoverColor = invert ? 'text-gray-400' : 'text-muted-foreground';

  return (
    <ul role="list" className={`mt-4 flex gap-x-10 ${className}`}>
      {socialMediaProfiles.map((socialMediaProfile) => (
        <li key={socialMediaProfile.title}>
          <Link
            href={socialMediaProfile.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${socialMediaProfile.title} in a new tab`}
            className={`${defaultColor} transform transition hover:${hoverColor}`}
          >
            <socialMediaProfile.icon className="h-6 w-6" />
          </Link>
        </li>
      ))}
    </ul>
  );
}
