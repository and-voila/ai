import { minLength, object, Output, string } from 'valibot';

export const imageFormSchema = object({
  prompt: string([minLength(1, 'Image prompt is required')]),
  amount: string([minLength(1, 'Amount is required')]),
  resolution: string([minLength(1, 'Resolution is required')]),
});

export type ImageFormDataType = Output<typeof imageFormSchema>;

export const amountOptions = [
  {
    value: '1',
    label: '1 Image',
  },
  {
    value: '2',
    label: '2 Images',
  },
  {
    value: '3',
    label: '3 Images',
  },
  {
    value: '4',
    label: '4 Images',
  },
];

export const resolutionOptions = [
  {
    value: '256x256',
    label: '256x256',
  },
  {
    value: '512x512',
    label: '512x512',
  },
  {
    value: '1024x1024',
    label: '1024x1024',
  },
];
