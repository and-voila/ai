import { Section } from '@/components/section';
import { TagList, TagListItem } from '@/components/tag-list';

export default function Coding() {
  return (
    <Section
      title="Coding Productivity Unlocked"
      image={{
        alt: "An illustration like Where's Waldo to find the cute Shih Tzu Poodle mix dog.",
        sizes: '(min-width: 1024px) 41rem, 31rem',
        className: 'justify-center lg:justify-end',
        src: '/images/features-coding.jpg',
        shape: 2,
      }}
    >
      <div className="space-y-6 text-base text-muted-foreground">
        <p>
          Collaborate with And Voila to boost your coding productivity. Explain
          your logic through comments, and it generates clean code adhering to
          your unique architectural patterns and conventions.
        </p>
        <p>
          Rapidly scaffold new features as And Voila suggests creative
          improvements tailored specifically to your existing codebase. Forget
          tedious tasks like documentation, refactoring, and QA - your AI
          assistant handles them for you.
        </p>
        <p>
          Whether starting from scratch or enhancing current projects, And Voila
          supercharges your workflow. Focus on the stimulating strategic work
          while your AI sidekick handles the drudgery. Your coding, accelerated.
        </p>
      </div>

      <h3 className="mt-12 font-display text-base font-semibold text-foreground">
        How it will help
      </h3>
      <TagList className="mt-4">
        <TagListItem>#RapidScaffolding</TagListItem>
        <TagListItem>#PersonalizedImprovements</TagListItem>
        <TagListItem>#TediumRemoval</TagListItem>
        <TagListItem>#TimeSaver</TagListItem>
        <TagListItem>#QualityCode</TagListItem>
      </TagList>
    </Section>
  );
}
