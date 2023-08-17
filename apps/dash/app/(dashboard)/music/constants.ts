import { minLength, object, Output, string } from 'valibot';

export const musicFormSchema = object({
  prompt: string([minLength(3, 'Prompt is required')]),
});

export type MusicFormDataType = Output<typeof musicFormSchema>;
