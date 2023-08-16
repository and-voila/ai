import { Container } from '@/components/container';
import { GridList, GridListItem } from '@/components/grid-list';
import { SectionIntro } from '@/components/section-intro';

export default function Culture() {
  return (
    <div className="mt-16 rounded-[40px] bg-muted py-16 sm:py-24 md:mt-32 lg:mt-48">
      <SectionIntro
        eyebrow="Guiding Principles"
        eyebrowColor="text-muted-foreground"
        title="How We Operate"
        titleColor="text-foreground"
      >
        <p className="text-muted-foreground">
          We champion a culture where ideas can emerge from anywhere. Teams are
          flatter, roles are blended, and success is collective. Our values of
          creativity, inclusion and trust guide daily decisions.
        </p>
        <p className="mt-6 text-muted-foreground">
          We move boldly, but thoughtfully, understanding the broader
          implications of our work. Our human-centric AI is a tool for progress,
          not just profits. We hold ourselves responsible for building a future
          that uplifts everyone
        </p>
      </SectionIntro>
      <Container className="mt-16">
        <GridList>
          <GridListItem title="Creators at Heart">
            Our creators are our lifeblood. We prioritize protecting,
            respecting, and nurturing their unique skills and talents.
          </GridListItem>
          <GridListItem title="Inclusive by Design">
            We foster a culture of accessibility, diversity, and belonging where
            all voices are heard and valued.
          </GridListItem>
          <GridListItem title="Courage to Innovate">
            Daring to responsibly explore the frontiers of human and AI
            potential, we challenge conventions and enable groundbreaking
            solutions.
          </GridListItem>
          <GridListItem title="Transparent Practices">
            Clear, honest communication guides our path. We value transparency
            in all our dealings with candidates, customers, investors, and the
            press.
          </GridListItem>
          <GridListItem title="Collective Brilliance & Unleashed Potential">
            We evolve through the alchemy of our diverse minds. Every team
            member is empowered to unlock their talents and reach new heights.
          </GridListItem>
          <GridListItem title="Humanity Amid AI">
            Our AI is designed to empower human creativity and connections, not
            replace them. We celebrate the fusion of technology and the human
            spirit.
          </GridListItem>
          <GridListItem title="Privacy and Trust">
            Safety, trust, and user privacy are our core commitments. We
            safeguard them zealously.
          </GridListItem>
          <GridListItem title="Shared Prosperity">
            Fair equity distribution and cooperative decision-making fuel our
            commitment to shared success.
          </GridListItem>
          <GridListItem title="Public Benefit Commitment">
            As a Public Benefit Corporation, we make choices that positively
            impact all stakeholders, fostering social good and ethical
            excellence.
          </GridListItem>
        </GridList>
      </Container>
    </div>
  );
}
