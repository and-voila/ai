'use client';

import { MagicWandIcon } from 'ui';
import { useEffect, useState } from 'react';

import { Button } from 'ui';
import { Card, CardContent } from 'ui';
import { Progress } from 'ui';
import { MAX_FREE_COUNTS } from 'constants';
import { useProModal } from 'hooks/use-pro-modal';

interface FreeCounterProps {
  apiLimitCount: number;
  isPro: boolean;
}

export const FreeCounter = ({
  apiLimitCount = 0,
  isPro = false,
}: FreeCounterProps) => {
  const proModal = useProModal();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  if (isPro) {
    return null;
  }

  return (
    <div className="px-3">
      <Card className="border-0 bg-primary dark:bg-primary-foreground">
        <CardContent className="py-6">
          <div className="mb-4 space-y-2 text-center text-sm text-primary-foreground dark:text-primary">
            <p>
              You&apos;ve used {apiLimitCount} / {MAX_FREE_COUNTS} free tricks
            </p>
            <Progress
              value={(apiLimitCount / MAX_FREE_COUNTS) * 100}
              className="h3"
            />
          </div>
          <Button
            onClick={proModal.onOpen}
            className="w-full"
            variant="premium"
          >
            Upgrade
            <MagicWandIcon className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
