import { Section } from '@/components/section';
import { TagList, TagListItem } from '@/components/tag-list';

export default function Multimedia() {
  return (
    <Section
      title="Multimedia Made Your Way"
      image={{
        alt: "An illustration like Where's Waldo to find the cute Chihuahua dog.",
        sizes: '(min-width: 1024px) 41rem, 31rem',
        className: 'justify-center lg:justify-end',
        src: '/images/features-multimedia.jpg',
        shape: 1,
      }}
    >
      <div className="space-y-6 text-base text-muted-foreground">
        <p>
          Expand beyond text with And Voila&apos;s multimedia creation
          capabilities. You can craft enthralling custom images, edit engaging
          video, design slick graphics, and produce sonically pleasing audio -
          all tuned to your precise creative style.
        </p>
        <p>
          Work in a standalone mode generating individual assets or make
          multimedia creation part of an integrated end-to-end workflow. Either
          way, your personalized essence shines through.
        </p>
        <p>
          With an AI assistant proficient across visual, written, and audio
          formats, your creative vision isn&apos;t limited. Manifest every piece
          fully to life in whichever formats you seek. It&apos;s multimedia
          creation, uniquely tailored to you.
        </p>
      </div>

      <h3 className="mt-12 font-display text-base font-semibold text-foreground">
        What it means for you
      </h3>
      <TagList className="mt-4">
        <TagListItem>#OriginalAssets</TagListItem>
        <TagListItem>#TailoredToYou</TagListItem>
        <TagListItem>#IntegratedWorkflow</TagListItem>
        <TagListItem>#OnBrand</TagListItem>
        <TagListItem>#CreativeFreedom</TagListItem>
      </TagList>
    </Section>
  );
}
