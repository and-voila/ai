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
    name: 'Writing Sample One',
    fieldName: 'writingSample1',
    description: 'writing sample one',
  },
  {
    name: 'Writing Sample Two',
    fieldName: 'writingSample2',
    description: 'Writing Sample Two',
  },
  {
    name: 'Writing Sample Three',
    fieldName: 'writingSample3',
    description: 'Writing Sample Three',
  },
  {
    name: 'Writing Sample Four',
    fieldName: 'writingSample4',
    description: 'Writing Sample Four',
  },
];
