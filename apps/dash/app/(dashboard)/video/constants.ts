import { minLength, object, Output, string } from 'valibot';

export const videoFormSchema = object({
  prompt: string([minLength(3, 'Prompt is required')]),
});

export type VideoFormDataType = Output<typeof videoFormSchema>;
