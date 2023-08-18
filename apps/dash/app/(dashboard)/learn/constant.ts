import { minLength, object, Output, string } from 'valibot';

export const writtingSampleSchema = object({
  writtingSample1: string([minLength(3, 'writting sample is required')]),
  writtingSample2: string([minLength(3, 'writting sample is required')]),
  writtingSample3: string([minLength(3, 'writting sample is required')]),
  writtingSample4: string([minLength(3, 'writting sample is required')]),
});

export type WrittingSampleDataType = Output<typeof writtingSampleSchema>;

export const writtingSampleSteps: {
  name: string;
  fieldName: keyof WrittingSampleDataType;
  description: string;
}[] = [
  {
    name: 'Writing Sample One',
    fieldName: 'writtingSample1',
    description: 'writting sample one',
  },
  {
    name: 'Writing Sample Two',
    fieldName: 'writtingSample2',
    description: 'Writing Sample Two',
  },
  {
    name: 'Writing Sample Three',
    fieldName: 'writtingSample3',
    description: 'Writing Sample Three',
  },
  {
    name: 'Writing Sample Four',
    fieldName: 'writtingSample4',
    description: 'Writing Sample Four',
  },
];
