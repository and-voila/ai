/* eslint-disable no-unused-vars */
import { useAuth } from '@clerk/nextjs';
import { ChatRequestOptions, CreateMessage, Message, nanoid } from 'ai';
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { Button } from 'ui';

import { getUserWritingRedis, ResponseRedis } from '@/lib/handleInngest';

const ConfirmComponent = ({
  setStep,
  append,
  isLoading,
}: {
  isLoading: boolean;
  setStep: Dispatch<SetStateAction<number>>;
  append: (
    message: Message | CreateMessage,
    chatRequestOptions?: ChatRequestOptions,
  ) => Promise<string>;
}) => {
  const { userId } = useAuth();
  const [isAppended, setIsAppended] = useState(false);
  const analyzedSample = useCallback(async () => {
    let response: ResponseRedis | null = null;

    do {
      const res = await getUserWritingRedis(userId);
      response = res;
      if (response?.status === 'pending') {
        await new Promise((resolve) => setTimeout(resolve, 10000));
      }
    } while (response?.status === 'pending');

    if (response && !isAppended) {
      append({
        content: response.combinedAnalysisInput,
        role: 'user',
        id: nanoid(),
      });
      setIsAppended(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    analyzedSample();
  }, [analyzedSample]);

  return (
    <div className="mb-10 grid w-full grid-cols-12 gap-2 rounded-lg border bg-background p-4 px-3 focus-within:shadow-sm md:px-6">
      <div className="col-span-12 lg:col-span-10" />

      <Button
        className="col-span-12 w-full lg:col-span-2 "
        onClick={() => setStep(2)}
        disabled={isLoading}
      >
        Confirm and Continue
      </Button>
    </div>
  );
};

export default ConfirmComponent;
