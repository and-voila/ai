import { useAuth } from '@clerk/nextjs';
import { Message } from 'ai';
import React, { Dispatch, SetStateAction, useCallback, useEffect } from 'react';
import { Button } from 'ui';

import { WritingStyleType } from '@/inngest/functions';
import { getUserWritingRedis } from '@/lib/handleInngest';

type ResponseRedis = {
  status: 'pending' | 'completed';
  writingAnalysis: WritingStyleType;
  messages?: {
    id: string;
    role: 'system' | 'user';
    content: string;
  }[];
};

const ConfirmComponent = ({
  setStep,
  setLearnMessages,
  setLoading,
}: {
  setStep: Dispatch<SetStateAction<number>>;
  setLearnMessages: Dispatch<SetStateAction<Message[]>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
}) => {
  const { userId } = useAuth();
  const analyzedSample = useCallback(async () => {
    let response: ResponseRedis | null = null;

    do {
      const res = await getUserWritingRedis(userId);
      response = res; // Update the response based on API result
      // console.log(response);
      if (response?.status === 'pending') {
        await new Promise((resolve) => setTimeout(resolve, 10000));
      }
    } while (response?.status === 'pending');

    if (response) {
      setLearnMessages((prevMessages) => [
        ...prevMessages,
        ...response.messages!,
      ]);
    }
    setLoading(false);
  }, [setLoading, userId, setLearnMessages]);

  useEffect(() => {
    analyzedSample();
  }, [analyzedSample]);

  return (
    <div className="mb-10 grid w-full grid-cols-12 gap-2 rounded-lg border bg-background p-4 px-3 focus-within:shadow-sm md:px-6">
      <div className="col-span-12 lg:col-span-10" />
      <Button
        className="col-span-12 w-full lg:col-span-2 "
        onClick={() => {
          setStep(2);
        }}
      >
        Confirm and Continue
      </Button>
    </div>
  );
};

export default ConfirmComponent;
