import { Section } from '@/components/section';
import { TagList, TagListItem } from '@/components/tag-list';

export default function Learns() {
  return (
    <Section
      title="AI that learns your creative spirit"
      image={{
        alt: "An illustration like Where's Waldo to find the cute Chihuahua dog",
        sizes: '(min-width: 1024px) 41rem, 31rem',
        className: 'justify-center lg:justify-end',
        src: '/images/features-creative-spirit.jpg',
      }}
    >
      <div className="space-y-6 text-base text-muted-foreground md:text-lg">
        <p>
          And Voila studies your body of work to intimately understand your
          creative spirit. It learns your preferred tone, unique diction, and
          brand essence to become a protégé that channels your voice.
        </p>
        <p>
          By continuously analyzing your content, And Voila remembers your
          context so you never have to start explanations from scratch. This
          retention allows remarkably personalized drafts requiring far less
          tedious refinement.
        </p>
        <p>
          Our AI goes beyond mere competence to actively enhance your
          creativity. It helps unlock fresh connections between ideas, new
          stylistic combinations, and untapped potential in your existing
          skills.
        </p>
        <p>
          The result is AI-assisted content that is distinctly and originally
          yours, not just passable imitation. And huge time savings from
          automated creation of completely on-brand drafts.
        </p>
      </div>

      <h3 className="mt-12 font-display text-base font-semibold text-foreground">
        What you stand to gain
      </h3>
      <TagList className="mt-4">
        <TagListItem>#SavesYouTime</TagListItem>
        <TagListItem>#FlawlessExecution</TagListItem>
        <TagListItem>#UniquelyYou</TagListItem>
        <TagListItem>#QualityContent</TagListItem>
        <TagListItem>#NoExplaining</TagListItem>
        <TagListItem>#BrandConsistency</TagListItem>
      </TagList>
    </Section>
  );
}
