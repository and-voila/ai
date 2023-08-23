import { useAuth } from '@clerk/nextjs';
import { Message } from 'ai';
import React, { Dispatch, SetStateAction } from 'react';
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
}: {
  setStep: Dispatch<SetStateAction<number>>;
  setLearnMessages: Dispatch<SetStateAction<Message[]>>;
}) => {
  const { userId } = useAuth();
  async function analyzedSample() {
    let response: ResponseRedis | null = null;

    do {
      const res = await getUserWritingRedis(userId);
      response = res; // Update the response based on API result

      if (response?.status === 'pending') {
        await new Promise((resolve) => setTimeout(resolve, 10000));
      }
    } while (response?.status === 'pending');

    if (response) {
      setLearnMessages((prevMessages) => [
        ...prevMessages,
        ...response.messages!,
      ]);
      setStep((prevStep) => prevStep + 1);
    }
  }

  return (
    <div>
      <Button
        className="text-primary-background rounded-md bg-primary-foreground px-4 py-2"
        onClick={() => {
          analyzedSample();
        }}
      >
        hey
      </Button>
    </div>
  );
};

export default ConfirmComponent;
