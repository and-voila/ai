import { Container } from '@/components/landing/container';
import { GridPattern } from '@/components/landing/grid-pattern';
import LandingFooter from '@/components/landing/landing-footer';
import LandingHero from '@/components/landing/landing-hero';
import { Logo, Logomark } from '@/components/logo';

export default async function DashboardLanding(): Promise<React.ReactElement | null> {
  return (
    <>
      <Container className="mt-24 sm:mt-32 md:mt-56">
        <div className="relative mb-10 mr-2 h-8 w-8">
          <Logomark className="h-8 w-8 sm:hidden" />
          <Logo className="hidden h-8 w-auto sm:block " fillOnHover />
        </div>
        <GridPattern
          className="absolute inset-x-0 -top-14 -z-10 h-[1000px] w-full fill-indigo-50 stroke-slate-100 [mask-image:linear-gradient(to_bottom_left,white_40%,transparent_50%)] dark:fill-primary dark:stroke-slate-500 dark:opacity-20"
          yOffset={-96}
          interactive
        />
        <LandingHero />
        <LandingFooter />
      </Container>
    </>
  );
}
