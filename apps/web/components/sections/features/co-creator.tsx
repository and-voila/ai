import { Section } from '@/components/section';
import { TagList, TagListItem } from '@/components/tag-list';

export default function CoCreator() {
  return (
    <Section
      title="Your AI co-creator"
      image={{
        alt: "An illustration like Where's Waldo to find the cute Shih Tzu Poodle mix dog.",
        sizes: '(min-width: 1024px) 41rem, 31rem',
        className: 'justify-center lg:justify-end',
        src: '/images/features-co-creator.jpg',
      }}
    >
      <div className="space-y-6 text-base text-muted-foreground md:text-lg">
        <p>
          And Voila operates as the fastest learner at your side, intuitively
          grasping your workflow needs. It fills the gaps in your process,
          handling tedious tasks so you can devote energy to the exhilarating
          creative work only you can produce.
        </p>
        <p>
          Imagine brainstorming a blog post and seamlessly receiving prompts for
          topics and talking points. And Voila anticipates your next steps,
          generating drafts and revisions in your voice.
        </p>
        <p>
          But it doesn&apos;t stop there. And Voila handles the entire
          publishing process—from SEO optimizations to social promotion—with
          your brand essence woven throughout.
        </p>
        <p>
          With an AI assistant proactively completing these workflow steps, you
          are freed up to channel your full imagination. And Voila reduces
          busywork so you can double down on creativity.
        </p>
      </div>

      <h3 className="mt-12 font-display text-base font-semibold text-foreground">
        Why it matters
      </h3>
      <TagList className="mt-4">
        <TagListItem>#NoBusywork</TagListItem>
        <TagListItem>#FreesYouToCreate</TagListItem>
        <TagListItem>#HandlesTheDetails</TagListItem>
      </TagList>
    </Section>
  );
}
