'use client';
import { useAuth } from '@clerk/nextjs';
import { valibotResolver } from '@hookform/resolvers/valibot';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, cn, Form, FormControl, FormField, FormItem, Input } from 'ui';

import {
  WrittingSampleDataType,
  writtingSampleSchema,
  writtingSampleSteps,
} from '@/app/(dashboard)/learn/constant';
import { handleWritingAnalysis } from '@/lib/handleInngest';

export function WrittingSample() {
  const { userId } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);

  const form = useForm<WrittingSampleDataType>({
    resolver: valibotResolver(writtingSampleSchema),
    defaultValues: {
      writtingSample1: '',
      writtingSample2: '',
      writtingSample3: '',
      writtingSample4: '',
    },
  });

  async function onSubmit(values: WrittingSampleDataType) {
    await handleWritingAnalysis({
      userId: userId,
      samples: [
        values.writtingSample1,
        values.writtingSample2,
        values.writtingSample3,
        values.writtingSample4,
      ],
    });
  }

  const currentStepConfig = writtingSampleSteps[currentStep];

  const moveToNextStep = async () => {
    const fieldName = currentStepConfig.fieldName;
    const isValid = await form.trigger(fieldName);

    if (isValid) {
      form.setValue(fieldName, form.getValues(fieldName));

      if (currentStep < writtingSampleSteps.length - 1) {
        form.setValue(writtingSampleSteps[currentStep + 1].fieldName, '');
        setCurrentStep((prevStep) => prevStep + 1);
      }
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      if (currentStep === writtingSampleSteps.length - 1) {
        form.handleSubmit(onSubmit)();
      } else {
        moveToNextStep();
      }
    }
  };

  return (
    <div className="px-4 lg:px-8">
      <Form {...form}>
        <form
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid w-full grid-cols-12 gap-2 rounded-lg border bg-background p-4 px-3 focus-within:shadow-sm md:px-6"
        >
          {writtingSampleSteps.map((step, index) => (
            <div
              key={step.fieldName}
              className={cn(
                'col-span-12 lg:col-span-10',
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
                        onKeyDown={handleKeyPress}
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          ))}

          {currentStep === writtingSampleSteps.length - 1 ? (
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
      </Form>
    </div>
  );
}
