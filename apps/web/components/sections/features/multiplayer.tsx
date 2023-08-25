import { Section } from '@/components/section';
import { TagList, TagListItem } from '@/components/tag-list';

export default function Multiplayer() {
  return (
    <Section
      title="Multiplayer collaboration"
      image={{
        alt: "An illustration like Where's Waldo to find the cute Shih Tzu dog",
        sizes: '(min-width: 1024px) 41rem, 31rem',
        className: 'justify-center lg:justify-end',
        src: '/images/features-multiplayer.jpg',
      }}
    >
      <div className="space-y-6 text-base text-muted-foreground md:text-lg">
        <p>
          And Voila&apos;s platform enables streamlined team collaboration
          without compromising privacy. Granular access controls and permissions
          allow you to work together securely.
        </p>
        <p>
          Role-based features let you selectively reveal work in progress.
          Retain full ownership while benefiting from collaborative workflows
          that reduce duplication and spark synergies.
        </p>
        <p>
          For creative teams, And Voila finally marries privacy protection with
          the power of leveraging diverse perspectives and complementary skill
          sets. Progress together securely.
        </p>
      </div>

      <h3 className="mt-12 font-display text-base font-semibold text-foreground">
        How it will help
      </h3>
      <TagList className="mt-4">
        <TagListItem>#SelectiveSharing</TagListItem>
        <TagListItem>#RetainOwnership</TagListItem>
        <TagListItem>#ReducedDuplication</TagListItem>
        <TagListItem>#TeamWorkflows</TagListItem>
        <TagListItem>#PrivacyProtection</TagListItem>
      </TagList>
    </Section>
  );
}
