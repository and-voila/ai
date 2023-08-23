import { email, minLength, object, type Output, string } from 'valibot';

export const contactFormSchema = object({
  email: string([email()]),
  name: string([minLength(3)]),
  company: string(),
  phone: string(),
  message: string(),
});

export type ContactFormDataType = Output<typeof contactFormSchema>;
