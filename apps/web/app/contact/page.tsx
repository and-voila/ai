import { Metadata } from 'next';
import { Suspense } from 'react';

import { Container } from '@/components/container';
import { PageIntro } from '@/components/page-intro';
import ContactDetails from '@/components/sections/contact/contact-details';
import ContactForm from '@/components/sections/contact/contact-form';
import { SITE_URL } from '@/lib/constants';

export function generateMetadata(): Metadata {
  const title = 'Contact';
  const description =
    'Want to get in touch? We would love to hear from you. Send us a message and we will get back to you as soon as possible.';

  const url = `${SITE_URL}/contact`;

  const metadata = {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
    },
    twitter: {
      title,
      description,
    },
  };

  return metadata;
}

export default function Contact() {
  return (
    <>
      <PageIntro eyebrow="Contact" title="We'd love to hear from you">
        <p className="text-muted-foreground">
          Have a question about a feature, trial, or even press? We&apos;re
          looking forward to hearing from you. We usually respond within a
          couple of business days, max.
        </p>
      </PageIntro>
      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <div className="grid grid-cols-1 gap-x-8 gap-y-24 lg:grid-cols-2">
          <Suspense fallback={<div>loading..</div>}>
            <ContactForm />
          </Suspense>
          <ContactDetails />
        </div>
      </Container>
    </>
  );
}
