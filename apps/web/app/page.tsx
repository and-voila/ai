import { Suspense } from 'react';
import { MagicWandIcon } from 'ui';

import Cta from '@/components/cta';
import Features from '@/components/features';
import { LandingHero } from '@/components/landing-hero';
import AiPartners from '@/components/sections/home/ai-partners';
import CaseStudies from '@/components/sections/home/use-cases';
import { Testimonial } from '@/components/testimonial';

const featuresSection = {
  eyebrow: 'Save time, create more',
  title: 'Generative AI that makes you a better creator',
  className: 'mt-24 sm:mt-32 lg:mt-40',
  intro: [
    "Imagine having the fastest learner in the world as your co-creator. Feed them an idea, they'll help flesh it out. From topics to talking points, drafts, and revisions, and voila.",
    "Just a sec, they're not done yet. SEO Meta title? Check. SEO Meta Description? Check. Featured images, Open Graph data, social posts, email copy? Check, check, check, and check. All in your unique voice, style, and brand. With And Voila, you're always one step ahead, able to focus on what truly matters.",
  ],
  listItems: [
    {
      title: 'Your AI Protege',
      content:
        'Learns your unique style to co-create with you. Provide work samples, and voila, your AI protegé gets scary good at reflecting your genius.',
    },
    {
      title: 'Multimedia Magic',
      content:
        'Write, create images, edit videos, add jingles, or develop code. And Voila is your all-in-one creative assistant, handling all the semantics so you can focus on the magic.',
    },
    {
      title: 'Privacy and IP Protection',
      content:
        'Keep your information private and your intellectual property secure. With And Voila, you control your IP rights, and your creativity remains your own, always protected.',
    },
    {
      title: 'Team Collaboration',
      content:
        "And Voila is a team player. Collaborate with your team seamlessly, regardless of device or location. In a jam? Activate AI that's always on brand and tone.",
    },
    {
      title: 'Unleash Your Potential',
      content:
        "With And Voila, the sky's the limit. Focus on creativity and let us handle the rest. It's your unique edge, now protected and prosperous.",
    },
  ],
};

const LandingPage = () => {
  return (
    <div className="h-full">
      <Suspense fallback={<div>getting rebekah attention</div>}>
        <LandingHero />
        <AiPartners />
        <CaseStudies />
        <Testimonial
          className="mt-24 sm:mt-32 lg:mt-40"
          client={{
            name: 'Rebekah Radice',
            logo: '/images/rebekah-radice.jpg',
          }}
        >
          I love it so much that I begged them to take my money to invest.
          Total. Game. Changer.
        </Testimonial>
        <Features section={featuresSection} />
        <Cta
          title="Power up your creativity"
          text="See firsthand how And Voila AI can enhance your creative process. Sign up now and try for yourself."
          linkHref="/sign-up"
          buttonText="Sign Up Free"
          buttonIcon={<MagicWandIcon />}
          footerText="No credit card required"
        />
      </Suspense>
    </div>
  );
};

export default LandingPage;
