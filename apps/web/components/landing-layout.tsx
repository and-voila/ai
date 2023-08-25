'use client';

/* eslint-disable prefer-const */
// import { useAuth } from '@clerk/nextjs';
import { motion, MotionConfig, useReducedMotion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, {
  createContext,
  SVGProps,
  useContext,
  useEffect,
  useId,
  useState,
} from 'react';
import { Button, Cross1Icon, HamburgerMenuIcon } from 'ui';

import { Container } from '@/components/container';
import { GridPattern } from '@/components/grid-pattern';
import Navigation from '@/components/landing-navigation';
import { Logo, Logomark } from '@/components/logo';
import { Offices } from '@/components/offices';
import { SocialMedia } from '@/components/social-media';

import { Footer } from './footer';

interface LandingLayoutContextType {
  logoHovered: boolean;
  setLogoHovered: React.Dispatch<React.SetStateAction<boolean>>;
}

const LandingLayoutContext = createContext<LandingLayoutContextType | null>(
  null,
);

interface RootLayoutInnerProps {
  children: React.ReactNode;
}

type HeaderProps = {
  onToggle: () => void;
  toggleRef: React.RefObject<HTMLButtonElement>;
  icon: React.ComponentType<SVGProps<SVGSVGElement>>;
  invert?: boolean;
};

function Header({
  onToggle,
  toggleRef,
  icon: Icon,
  invert,
}: HeaderProps & { expanded: boolean }) {
  // const { isSignedIn } = useAuth();
  const landingLayoutContext = useContext(
    LandingLayoutContext,
  ) as LandingLayoutContextType;

  return (
    <Container>
      <div className="flex items-center justify-between">
        <Link
          href="/"
          aria-label="Home"
          className="flex items-center"
          onMouseEnter={() => landingLayoutContext?.setLogoHovered(true)}
          onMouseLeave={() => landingLayoutContext?.setLogoHovered(false)}
        >
          <Logomark
            className="h-9 sm:hidden"
            invert={invert}
            filled={landingLayoutContext?.logoHovered}
          />
          <Logo
            className="hidden h-9 sm:block"
            invert={invert}
            filled={landingLayoutContext?.logoHovered}
          />
        </Link>
        <div className="flex items-center gap-x-8">
          <Button variant="navbar" className="rounded-md">
            <Link href={'https://app.andvoila.ai/sign-up'}>Get Started</Link>
          </Button>
          <Button
            variant="menu"
            ref={toggleRef}
            onClick={onToggle}
            className="group -m-2.5 rounded p-2.5 transition"
            aria-label="Toggle navigation"
          >
            <Icon
              className={`h-6 w-6 ${
                Icon === Cross1Icon ? 'text-slate-50' : 'text-foreground'
              }`}
            />
          </Button>
        </div>
      </div>
    </Container>
  );
}

function LandingLayoutInner({ children }: RootLayoutInnerProps) {
  let panelId = useId();
  let [expanded, setExpanded] = useState(false);
  let openRef = React.useRef<HTMLButtonElement>(null);
  let closeRef = React.useRef<HTMLButtonElement>(null);
  let navRef = React.useRef<HTMLDivElement>(null);
  let shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (
        (event.target as HTMLElement)?.closest('a')?.href ===
        window.location.href
      ) {
        setExpanded(false);
      }
    }

    window.addEventListener('click', onClick);

    return () => {
      window.removeEventListener('click', onClick);
    };
  }, []);

  return (
    <MotionConfig transition={shouldReduceMotion ? { duration: 0 } : undefined}>
      <header>
        <div
          className="absolute left-0 right-0 top-2 z-40 pt-14"
          aria-hidden={expanded ? 'true' : undefined}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //  @ts-ignore
          inert={expanded ? '' : undefined}
        >
          <Header
            icon={
              HamburgerMenuIcon as React.ComponentType<SVGProps<SVGSVGElement>>
            }
            toggleRef={openRef}
            onToggle={() => {
              setExpanded((expanded) => !expanded);
              window.setTimeout(
                () => closeRef.current?.focus({ preventScroll: true }),
              );
            }}
            expanded={expanded}
          />
        </div>

        <motion.div
          layout
          id={panelId}
          style={{ height: expanded ? 'auto' : '0.5rem' }}
          className="relative z-50 overflow-hidden bg-primary pt-2"
          aria-hidden={expanded ? undefined : 'true'}
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //  @ts-ignore
          inert={expanded ? undefined : ''}
        >
          <motion.div layout className="bg-slate-50">
            <div ref={navRef} className="bg-primary pb-16 pt-14">
              <Header
                invert
                icon={
                  Cross1Icon as React.ComponentType<SVGProps<SVGSVGElement>>
                }
                toggleRef={closeRef}
                onToggle={() => {
                  setExpanded((expanded) => !expanded);
                  window.setTimeout(
                    () => openRef.current?.focus({ preventScroll: true }),
                  );
                }}
                expanded={expanded}
              />
            </div>
            <Navigation />
            <div className="relative bg-primary before:absolute before:inset-x-0 before:top-0 before:h-px before:bg-slate-50">
              <Container>
                <div className="grid grid-cols-1 gap-y-10 pb-16 pt-10 sm:grid-cols-2 sm:pt-16">
                  <div>
                    <h2 className="font-display text-lg font-semibold text-slate-50">
                      We&apos;re remote friendly
                    </h2>
                    <Offices
                      invert
                      className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2"
                    />
                  </div>
                  <div className="sm:border-l sm:border-transparent sm:pl-16">
                    <h2 className="font-display text-lg font-semibold text-slate-50">
                      Follow us
                    </h2>
                    <SocialMedia invert className="mt-6" />
                  </div>
                </div>
              </Container>
            </div>
          </motion.div>
        </motion.div>
      </header>

      <div className="relative">
        <div className="absolute inset-0 bg-primary" />
        <motion.div
          layout
          style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
          className="relative flex flex-auto overflow-hidden bg-background pt-14"
        >
          <motion.div
            layout
            className="relative isolate flex w-full flex-col pt-9"
          >
            <GridPattern
              className="absolute inset-x-0 -top-14 -z-10 h-[1000px] w-full fill-indigo-50 stroke-slate-100 [mask-image:linear-gradient(to_bottom_left,white_40%,transparent_50%)] dark:fill-primary dark:stroke-slate-500 dark:opacity-20"
              yOffset={-96}
              interactive
            />

            <main className="w-full flex-auto">{children}</main>

            <Footer />
          </motion.div>
        </motion.div>
      </div>
    </MotionConfig>
  );
}

function LandingLayout({ children }: RootLayoutInnerProps) {
  let pathname = usePathname();
  let [logoHovered, setLogoHovered] = useState<boolean>(false);
  return (
    <LandingLayoutContext.Provider
      value={{
        logoHovered,
        setLogoHovered,
      }}
    >
      <LandingLayoutInner key={pathname}>{children}</LandingLayoutInner>
    </LandingLayoutContext.Provider>
  );
}

export default LandingLayout;
