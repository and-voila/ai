import Link from 'next/link';

import { Container } from '@/components/container';
import { FadeIn } from '@/components/fade-in';
import { Offices } from '@/components/offices';
import { Button } from 'ui';

export function ContactSection() {
  return (
    <Container className="mt-24 sm:mt-32 lg:mt-40">
      <FadeIn className="-mx-6 rounded-[40px] bg-primary px-6 py-20 sm:mx-0 sm:py-32 md:px-12">
        <div className="mx-auto max-w-4xl">
          <div className="max-w-xl">
            <h2 className="font-display text-3xl font-medium text-slate-50 [text-wrap:balance] sm:text-4xl">
              Have a question?
            </h2>
            <div className="mt-6 flex">
              <Button variant="default" className="rounded-md">
                <Link href="/contact">Say Aloha</Link>
              </Button>
            </div>
            <div className="mt-10 border-t border-slate-500 pt-10">
              <h3 className="text-base font-semibold text-slate-50 dark:text-slate-50">
                Our offices
              </h3>
              <Offices
                invert
                className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2"
              />
            </div>
          </div>
        </div>
      </FadeIn>
    </Container>
  );
}
