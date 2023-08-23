import { minLength, object, Output, string } from 'valibot';

export const codeFormSchema = object({
  prompt: string([minLength(3, 'Prompt must be at least 3 characters')]),
});

export type CodeFormDataType = Output<typeof codeFormSchema>;
