import * as React from 'react';

import { Container } from './container';
import { FadeIn } from './fade-in';
import { List, ListItemGroup } from './list';
import { SectionIntro } from './section-intro';
import { StylizedImage } from './stylized-image';

type SectionProps = {
  eyebrow: string;
  title: string;
  className: string;
  intro: string[];
  listItems: {
    title: string;
    content: string;
  }[];
};

type FeaturesProps = {
  section: SectionProps;
};

const Features: React.FC<FeaturesProps> = ({ section }) => {
  return (
    <>
      <SectionIntro
        eyebrow={section.eyebrow}
        title={section.title}
        className={section.className}
      >
        <React.Suspense fallback={<div>loading...</div>}>
          {section.intro.map((paragraph, index) => (
            <p
              key={index}
              className={`text-muted-foreground ${index > 0 ? 'mt-6' : ''}`}
            >
              {paragraph}
            </p>
          ))}
        </React.Suspense>
      </SectionIntro>
      <Container className="mt-16">
        <div className="lg:flex lg:items-center lg:justify-end">
          <div className="my-24 flex justify-center lg:w-1/2 lg:justify-end lg:pr-12">
            <FadeIn className="w-[20rem] flex-none md:w-[28rem] lg:w-[36rem]">
              <React.Suspense fallback={<div>Loading image...</div>}>
                <StylizedImage
                  alt="An illustration like Where's Waldo to find the cute Shih Tzu dog."
                  src="/images/home-features.jpg"
                  sizes="(min-width: 1024px) 41rem, 31rem"
                  className="justify-center lg:justify-end"
                />
              </React.Suspense>
            </FadeIn>
          </div>
          <List className="lg:w-1/2 lg:min-w-[33rem] lg:pl-4">
            <ListItemGroup items={section.listItems} />
          </List>
        </div>
      </Container>
    </>
  );
};

export default Features;
