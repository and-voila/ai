import { Container } from '@/components/container';
import { PageIntro } from '@/components/page-intro';
import ContactDetails from '@/components/sections/contact/contact-details';
import ContactForm from '@/components/sections/contact/contact-form';

export const metadata = {
  title: 'Contact Us',
  description: 'Let’s work together. We can’t wait to hear from you.',
};

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
          <ContactForm />
          <ContactDetails />
        </div>
      </Container>
    </>
  );
}
