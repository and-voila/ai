'use client';

import { valibotResolver } from '@hookform/resolvers/valibot';
import { Suspense, useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Button,
  cn,
  Form,
  FormControl,
  FormField,
  FormItem,
  Input,
  Label,
} from 'ui';

import { ContactFormDataType, contactFormSchema } from '@/app/contact/constant';
import { FadeIn } from '@/components/fade-in';
import { FormLoader } from '@/components/loaders';
import ReactTurnstile from '@/components/react-turnstile';

type TextInputProps = {
  label: string;
  className?: string;
  error?: string;
};

function TextInput({ label, className, error, ...props }: TextInputProps) {
  const id = useId();

  return (
    <div className="group relative z-0 transition-all focus-within:z-10">
      <Input
        type="text"
        id={id}
        {...props}
        placeholder=" "
        className={cn(className, 'peer w-full rounded-none px-6 pb-8 pt-12')}
      />
      <Label
        htmlFor={id}
        className={cn(
          error
            ? 'text-red-500 peer-focus:text-red-500 peer-[:not(:placeholder-shown)]:text-red-500'
            : 'text-muted-foreground peer-focus:text-muted-foreground peer-[:not(:placeholder-shown)]:text-muted-foreground',
          'pointer-events-none absolute left-6 top-1/2 -mt-3 origin-left text-base/6 transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold  peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold ',
        )}
      >
        {label}
      </Label>
    </div>
  );
}

export default function ContactForm() {
  const form = useForm<ContactFormDataType>({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    resolver: valibotResolver(contactFormSchema),
  });
  const [verified, setVerified] = useState<boolean>(false);
  const [messageSent, setMessageSent] = useState<boolean>(false);

  async function onSubmit(data: ContactFormDataType) {
    await fetch('/api/slack-message', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        company: data.company,
        message: data.message,
        phone: data.phone,
      }),
    }).then(() => {
      setMessageSent(true);
      form.reset();
    });
  }

  return (
    <FadeIn className="lg:order-last">
      <Suspense fallback={<FormLoader />}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <h2 className="font-display text-lg font-semibold text-foreground lg:text-xl">
              Drop us a line
            </h2>
            <div className="isolate mt-6 -space-y-px rounded-md">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <TextInput
                        label="Name"
                        {...field}
                        error={form.formState.errors.name?.message as string}
                        className="!rounded-t-2xl"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <TextInput
                        label="E-mail"
                        {...field}
                        error={form.formState.errors.email?.message}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="company"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <TextInput
                        label="Company"
                        {...field}
                        error={form.formState.errors.company?.message}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <TextInput
                        label="Phone"
                        {...field}
                        error={form.formState.errors.phone?.message}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <TextInput
                        label="Message"
                        {...field}
                        error={form.formState.errors.message?.message}
                        className="!rounded-b-2xl"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <ReactTurnstile setVerified={setVerified} />
            <Button
              variant="default"
              disabled={verified == false}
              type="submit"
              className="mt-10"
            >
              {messageSent ? 'Message sent!' : 'Send message'}
            </Button>
          </form>
        </Form>
      </Suspense>
    </FadeIn>
  );
}
