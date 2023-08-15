'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useId, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { FadeIn } from '@/components/fade-in';
import ReactTurnstile from '@/components/react-turnstile';
import {
  Button,
  Label,
  Form,
  FormControl,
  FormField,
  FormItem,
  Input,
  cn,
} from 'ui';

const schema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .nonempty('Email is required')
    .email('Invalid email address'),
  name: z
    .string({
      required_error: 'Name is required',
    })
    .nonempty('Name is required'),
  company: z
    .string({
      required_error: 'Company name is required',
    })
    .nonempty('Company name is required'),
  phone: z.string().refine((val) => {
    const phoneRegex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    return phoneRegex.test(val);
  }),
  message: z
    .string({
      required_error: 'Message is required',
    })
    .nonempty('Message is required'),
});

type ContactFormFields = z.infer<typeof schema>;

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
  const form = useForm<ContactFormFields>({
    resolver: zodResolver(schema),
  });
  const [verified, setVerified] = useState<boolean>(false);

  async function onSubmit(data: ContactFormFields) {
    console.log(`HEY: ${data.name}`);
  }

  return (
    <FadeIn className="lg:order-last">
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
                      error={form.formState.errors.name?.message}
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
            Contact And Voila
          </Button>
        </form>
      </Form>
    </FadeIn>
  );
}
