import { Section } from '@/components/section';
import { TagList, TagListItem } from '@/components/tag-list';

export default function Privacy() {
  return (
    <Section
      title="Total Privacy and IP Control"
      image={{
        alt: "An illustration like Where's Waldo to find the cute Shih Tzu Poodle mix dog.",
        sizes: '(min-width: 1024px) 41rem, 31rem',
        className: 'justify-center lg:justify-end',
        src: '/images/features-privacy.jpg',
        shape: 1,
      }}
    >
      <div className="space-y-6 text-base text-muted-foreground">
        <p>
          Rest assured your ideas stay safely yours with And Voila. Our
          blockchain-enabled platform cryptographically seals your work so
          it&apos;s verifiably created by you. No more IP concerns.
        </p>
        <p>
          Granularly monitor copyright usage instances, set licensing policies,
          control distribution rights, and take action on infringement - all
          while securely monetizing your work exactly how you choose.
        </p>
        <p>
          Your privacy is guaranteed with encrypted data, access controls, and
          transparency over how your information is handled. Don&apos;t just
          protect your IP, prosper from it.
        </p>
      </div>

      <h3 className="mt-12 font-display text-base font-semibold text-foreground">
        Why you should care
      </h3>
      <TagList className="mt-4">
        <TagListItem>#VerifiableOwnership</TagListItem>
        <TagListItem>#UsageMonitoring</TagListItem>
        <TagListItem>#LicensingControl</TagListItem>
        <TagListItem>#SecureRevenue</TagListItem>
        <TagListItem>#GuaranteedPrivacy</TagListItem>
      </TagList>
    </Section>
  );
}
