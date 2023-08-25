import { minLength, object, Output, string } from 'valibot';

export const writingSampleSchema = object({
  writingSample1: string([minLength(3, 'writing sample is required')]),
  writingSample2: string([minLength(3, 'writing sample is required')]),
  writingSample3: string([minLength(3, 'writing sample is required')]),
  writingSample4: string([minLength(3, 'writing sample is required')]),
});

export type WritingSampleDataType = Output<typeof writingSampleSchema>;

export const writingSampleSteps: {
  name: string;
  fieldName: keyof WritingSampleDataType;
  description: string;
}[] = [
  {
    name: 'Paste your first writing sample here then click Next',
    fieldName: 'writingSample1',
    description: 'writing sample one',
  },
  {
    name: 'OK great, now paste a second writing sample then click Next',
    fieldName: 'writingSample2',
    description: 'Writing Sample Two',
  },
  {
    name: 'Alright, now paste a third writing sample then click Next',
    fieldName: 'writingSample3',
    description: 'Writing Sample Three',
  },
  {
    name: 'Awesome, paste your fourth writing sample then Submit ',
    fieldName: 'writingSample4',
    description: 'Writing Sample Four',
  },
];
