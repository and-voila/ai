import { SectionIntro } from '@/components/section-intro';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from 'ui';

const Faq = () => {
  return (
    <div className="mx-auto mt-24 max-w-6xl">
      <SectionIntro
        eyebrow="FAQs - Digging Deeper"
        title="Have questions?"
        className="mt-24 sm:mt-32 lg:mt-40"
      >
        <p className="text-muted-foreground">
          Wondering about the nuts and bolts of And Voila? That&apos;s great!
          We&apos;re all about transparency and we love curiosity.
        </p>
      </SectionIntro>
      <div className="mx-auto mt-24 grid grid-cols-1 gap-4 p-8 sm:grid-cols-2">
        <div>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                What types of content can I create?
              </AccordionTrigger>
              <AccordionContent>
                And Voila can create a diverse range of content including blog
                posts, email campaigns, social media posts, and more.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                Can you adapt to my unique writing style?
              </AccordionTrigger>
              <AccordionContent>
                Yes. With a few samples of your work, And Voila can mirror your
                unique writing style to assist with content creation.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>
                What is the typical content creation process?
              </AccordionTrigger>
              <AccordionContent>
                And Voila assists you at each step of content creation: from
                brainstorming topics, creating outlines and drafts, to making
                revisions and finalizing the piece. SEO, metadata, and images?
                Done, done, and done.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
        <div>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-5">
              <AccordionTrigger>
                How do you protect my intellectual property?
              </AccordionTrigger>
              <AccordionContent>
                And Voila creates AI-assisted content which means the final
                product is unique to you and eligible for copyright protection.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>
                What&apos;s included in the paid plans?
              </AccordionTrigger>
              <AccordionContent>
                Both plans include unlimited team members, privacy by default,
                and a 100% Delight Guarantee. The only difference is the billing
                period.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-7">
              <AccordionTrigger>
                What non-profit work qualifies for the grant?
              </AccordionTrigger>
              <AccordionContent>
                Nonprofits focused on education, human rights, environment, and
                services for the underserved qualify. Political and religious
                organizations, however, are excluded.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default Faq;
