import * as z from 'zod';

export const formSchema = z.object({
  prompt: z.string().min(1, { message: 'Image prompt is required' }),
  amount: z.string().min(1),
  resolution: z.string().min(1),
});

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
