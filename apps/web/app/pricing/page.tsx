import { FC } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'ui';

import Faq from '@/components/sections/pricing/faq';
import PricingTier, {
  DiscountedTier,
  tiers,
} from '@/components/sections/pricing/pricing-tiers';

const Pricing: FC = () => {
  const uniqueTiers = tiers
    .map((tier) => tier.tier)
    .filter((v, i, a) => a.indexOf(v) === i);
  return (
    <div className="isolate overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 pb-96 pt-24 text-center sm:pt-32 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="mx-auto max-w-xs rounded-md ring-1 ring-muted">
            <h1 className="font-display text-base text-muted-foreground">
              Early Access Pricing
            </h1>
          </div>
          <p className="mt-2 font-display text-4xl font-medium text-foreground sm:text-5xl">
            Dazzling product, <br className="hidden sm:inline lg:hidden" />
            simple pricing
          </p>
        </div>
        <div className="relative mt-6">
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Flexible pricing that suits all. Backed by our 100% Delight
            Guarantee. Not thrilled? Money back. Forever, whenever.
          </p>
        </div>
      </div>
      <div className="pb-24 sm:pb-32">
        <div className="mx-auto -mt-80 max-w-6xl">
          <Tabs defaultValue="Annual" className="mx-auto max-w-4xl gap-8">
            <TabsList className="mx-auto  mb-10 flex w-full md:w-1/2">
              {uniqueTiers.map((tier) => (
                <TabsTrigger value={tier} key={tier} className="w-full">
                  {tier}
                </TabsTrigger>
              ))}
            </TabsList>
            {uniqueTiers.map((tier) => (
              <TabsContent value={tier} key={tier}>
                <div className="flex flex-col justify-center space-y-8 sm:flex-row sm:space-x-8 sm:space-y-0">
                  {tiers
                    .filter((t) => t.tier === tier)
                    .map((t) => (
                      <div className="h-full flex-1" key={t.id}>
                        <PricingTier tier={t} />
                      </div>
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
          <DiscountedTier
            title="Lifetime Grant Program"
            description="We support creators championing registered nonprofits in education, human rights, and the environment with a lifetime subscription, valued at $25,000. Certain conditions apply."
            href="#"
          />
          <Faq />
        </div>
      </div>
    </div>
  );
};

export default Pricing;
