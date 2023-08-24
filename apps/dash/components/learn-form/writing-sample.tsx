'use client';
import { useAuth } from '@clerk/nextjs';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, cn, Form, FormControl, FormField, FormItem, Input } from 'ui';

import {
  WritingSampleDataType,
  writingSampleSchema,
  writingSampleSteps,
} from '@/app/(dashboard)/learn/constant';
import { handleWritingAnalysis } from '@/lib/handleInngest';

export function WritingSample({
  setStep,
  setLoading,
}: {
  setStep: Dispatch<SetStateAction<number>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}) {
  const { userId } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm<WritingSampleDataType>({
    resolver: valibotResolver(writingSampleSchema),
    defaultValues: {
      writingSample1: '',
      writingSample2: '',
      writingSample3: '',
      writingSample4: '',
    },
  });

  async function onSubmit(values: WritingSampleDataType) {
    await handleWritingAnalysis({
      userId: userId,
      samples: [
        values.writingSample1,
        values.writingSample2,
        values.writingSample3,
        values.writingSample4,
      ],
    });
    setStep((prevStep) => prevStep + 1);
    setLoading(true);
  }

  const currentStepConfig = writingSampleSteps[currentStep];

  const moveToNextStep = async () => {
    const fieldName = currentStepConfig.fieldName;
    const isValid = await form.trigger(fieldName);

    if (isValid) {
      form.setValue(fieldName, form.getValues(fieldName));

      if (currentStep < writingSampleSteps.length - 1) {
        form.setValue(writingSampleSteps[currentStep + 1].fieldName, '');
        setCurrentStep((prevStep) => prevStep + 1);
      }
    }
  };

  return (
    <Form {...form}>
      <div className="mb-10 flex grid w-full grid-cols-12 rounded-lg border bg-background p-4 px-3 focus-within:shadow-sm md:px-6">
        <form
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
          className="col-span-12 grid w-full grid-cols-12"
        >
          {writingSampleSteps.map((step, index) => (
            <div
              key={step.fieldName}
              className={cn(
                'col-span-12 w-full lg:col-span-10',
                index === currentStep ? '' : 'hidden',
              )}
            >
              <FormField
                control={form.control}
                name={step.fieldName}
                render={({ field }) => (
                  <FormItem>
                    <FormControl className="margin-0 p-0">
                      <Input
                        className="border-0 text-base outline-none focus-visible:ring-0 focus-visible:ring-offset-transparent"
                        placeholder={step.name}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          ))}

          {currentStep === writingSampleSteps.length - 1 ? (
            <Button className="col-span-12 w-full lg:col-span-2 " type="submit">
              Submit
            </Button>
          ) : (
            <Button
              type="button"
              onClick={moveToNextStep}
              disabled={!form.getValues(currentStepConfig.fieldName)}
              className="col-span-12 w-full lg:col-span-2 "
            >
              Next
            </Button>
          )}
        </form>
      </div>
    </Form>
  );
}
