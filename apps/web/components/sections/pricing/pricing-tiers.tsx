import Link from 'next/link';
import { FC } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  CheckIcon,
  HeartIcon,
  MagicWandIcon,
} from 'ui';

interface Tier {
  name: string;
  tier: 'Monthly' | 'Annual';
  id: string;
  href: string;
  priceMonthly: string;
  description: string;
  features: string[];
  planType: 'solo' | 'team';
}

export const tiers: Tier[] = [
  {
    name: 'Solo',
    tier: 'Monthly',
    id: 'solo-monthly',
    href: '#',
    priceMonthly: '$99',
    description:
      'Perfect for solor creators blazing a trail to crush it like a boss.',
    features: [
      'Includes everything for 1 user',
      'Advanced analytics',
      'Dedicated support',
      'Privacy by default, your data is yours',
      'Marketing automations',
      '100% Delight Guaranteed',
    ],
    planType: 'solo',
  },
  {
    name: 'Team',
    tier: 'Monthly',
    id: 'team-monthly',
    href: '#',
    priceMonthly: '$299',
    description:
      'Collaborative features for teams who prefer short-term commitments.',
    features: [
      'Includes everything, no limits for teams',
      'Advanced analytics',
      'Dedicated support',
      'Privacy by default, your data is yours',
      'Marketing automations',
      '100% Delight Guaranteed',
    ],
    planType: 'team',
  },
  {
    name: 'Solo',
    tier: 'Annual',
    id: 'solo-annual',
    href: '#',
    priceMonthly: '$79',
    description:
      'Unlock everything for an individual user at a discounted price.',
    features: [
      'Includes everything for 1 user',
      'Advanced analytics',
      'Dedicated support',
      'Privacy by default, your data is yours',
      'Marketing automations',
      '100% Delight Guaranteed',
    ],
    planType: 'solo',
  },
  {
    name: 'Team',
    tier: 'Annual',
    id: 'team-annual',
    href: '#',
    priceMonthly: '$239',
    description: 'Unlock team collaboration at a discounted price.',
    features: [
      'Includes everything, no limits for teams',
      'Advanced analytics',
      'Dedicated support',
      'Privacy by default, your data is yours',
      'Marketing automations',
      '100% Delight Guaranteed',
    ],
    planType: 'team',
  },
];

interface PricingTierProps {
  tier: Tier;
}

const PricingTier: FC<PricingTierProps> = ({ tier }) => (
  <Card className="flex flex-col justify-between">
    <CardHeader>
      <CardTitle
        id={tier.id}
        className="font-display text-base text-muted-foreground"
      >
        {tier.name}
      </CardTitle>
      <CardDescription className="mt-4 flex items-baseline gap-x-2">
        <span className="text-5xl font-semibold tracking-tight text-foreground">
          {tier.priceMonthly}
        </span>
        <span className="text-base text-muted-foreground">/month</span>
      </CardDescription>
    </CardHeader>
    <CardContent className="mt-2 text-base text-muted-foreground">
      <p>{tier.description}</p>
      <ul role="list" className="mt-10 space-y-4 text-sm text-muted-foreground">
        {tier.features.map((feature) => (
          <li key={feature} className="flex gap-x-3">
            <CheckIcon
              className="h-6 w-5 flex-none text-primary"
              aria-hidden="true"
            />
            {feature}
          </li>
        ))}
      </ul>
    </CardContent>
    <CardFooter>
      <Button className="w-full" variant={'premium'}>
        <Link
          className="flex items-center gap-2"
          href={tier.href}
          aria-describedby={tier.id}
        >
          Get started today
          <MagicWandIcon />
        </Link>
      </Button>
    </CardFooter>
  </Card>
);

export default PricingTier;

interface DiscountedTierProps {
  title: string;
  description: string;
  href: string;
}

export const DiscountedTier: FC<DiscountedTierProps> = ({
  title,
  description,
  href,
}) => (
  <div className="mx-auto mt-24 flex max-w-4xl flex-col items-start gap-x-8 gap-y-6 rounded-md bg-muted ring-1 ring-muted-foreground sm:gap-y-10 sm:p-6 lg:col-span-2 lg:flex-row lg:items-center">
    <div className="lg:min-w-0 lg:flex-1">
      <h3 className="font-display text-lg font-medium text-foreground">
        {title}
      </h3>
      <p className="mt-1 text-base text-muted-foreground">{description}</p>
    </div>
    <Button variant="outline">
      <Link className="flex items-center" href={href}>
        Apply now <HeartIcon className="ml-2 h-4 w-4" />
      </Link>
    </Button>
  </div>
);
