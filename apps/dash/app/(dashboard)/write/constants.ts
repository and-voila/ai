import { minLength, object, Output, string } from 'valibot';

export const writeFormSchema = object({
  prompt: string([minLength(3, 'Prompt is required')]),
});

export type WriteFormDataType = Output<typeof writeFormSchema>;
