import { Section } from '@/components/sections';
import { TagList, TagListItem } from '@/components/tag-list';

export default function Writing() {
  return (
    <Section
      title="Writing Uniquely Yours"
      image={{
        alt: 'laptop',
        sizes: '(min-width: 1024px) 41rem, 31rem',
        className: 'justify-center lg:justify-end',
        src: '/images/features-writing.jpg',
        shape: 2,
      }}
    >
      <div className="space-y-6 text-base text-muted-foreground">
        <p>
          Import your sitemap or upload content samples, and And Voila studies
          your work to learn your distinctive writing style. Connect your social
          profiles, and it understands your brand voice across platforms.
        </p>
        <p>
          Armed with this deep comprehension, And Voila can assist with
          generating blog posts, social media content, email campaigns, and
          more. It crafts drafts tuned precisely to your tone, diction, and
          creative patterns - saving you from bland generic output.
        </p>
        <p>
          Want AI to fully write content? No problem, And Voila can do that too
          with remarkably human-like results tailored to you. Whether you seek
          inspiration, time savings, or total automation, your unique
          perspective shines through.
        </p>
      </div>

      <h3 className="mt-12 font-display text-base font-semibold text-foreground">
        Things to consider
      </h3>
      <TagList className="mt-4">
        <TagListItem>#NoReworkNeeded</TagListItem>
        <TagListItem>#BrandConsistent</TagListItem>
        <TagListItem>#SavesYouTime</TagListItem>
        <TagListItem>#YourStyle</TagListItem>
        <TagListItem>#QualityContent</TagListItem>
      </TagList>
    </Section>
  );
}
