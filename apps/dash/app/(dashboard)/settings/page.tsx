import { CreateOrganization, UserProfile } from '@clerk/nextjs';
import { Heading } from 'components/heading';
import { SubscriptionButton } from 'components/subscription-button';
import { checkSubscription } from 'lib/subscription';
import { GearIcon } from 'ui';
import { Tabs, TabsContent, TabsList, TabsTrigger } from 'ui';

const SettingsPage = async () => {
  const isPro = await checkSubscription();

  return (
    <div className="md:mt-8">
      <Heading
        title="Settings"
        description="Manage account settings."
        icon={GearIcon}
      />
      <div className="mt-16 w-full space-y-4 px-8 lg:w-3/4 lg:px-12 xl:w-2/3">
        <Tabs defaultValue="profile" className="w-full lg:w-3/4 xl:w-2/3">
          <TabsList className="px-2 py-1">
            <TabsTrigger value="subscription">Subscription</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="team">Team</TabsTrigger>
          </TabsList>
          <TabsContent
            value="subscription"
            className="mt-6 space-y-4 lg:space-y-6"
          >
            <h3 className="text-base font-semibold text-foreground lg:text-lg">
              {isPro ? 'Manage Subscription.' : 'Ready to go Premium?'}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground lg:text-base">
              {isPro
                ? 'Update your payment info, change billing cycle, or cancel. Payment processing handled securely by Stripe.'
                : 'Subscribe today. Backed by our 100% Delight Guarantee. Payments are handled by Stripe, ensuring a secure and smooth experience.'}
            </p>
            <div className="">
              <SubscriptionButton isPro={isPro} />
            </div>
          </TabsContent>
          <TabsContent value="profile" className="mt-6 space-y-4 lg:space-y-6">
            <h3 className="text-base font-semibold text-foreground lg:text-lg">
              Manage Your User Profile
            </h3>
            <p className="mt-2 text-sm text-muted-foreground lg:text-base">
              Update your avatar, connect your accounts, or secure your account
              with 2FA.
            </p>
            <UserProfile />
          </TabsContent>
          <TabsContent value="team" className="mt-6 space-y-4 lg:space-y-6">
            <h3 className="text-base font-semibold text-foreground lg:text-lg">
              Create or Manage Team
            </h3>
            <p className="mt-2 text-sm text-muted-foreground lg:text-base">
              Collaborate with others and create magic together. Invite team
              members, assign roles, and get ready for the next big thing.
            </p>
            <CreateOrganization />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SettingsPage;
