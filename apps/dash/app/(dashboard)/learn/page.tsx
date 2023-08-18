import React from 'react';
import { ReaderIcon } from 'ui';

import { Heading } from '@/components/heading';
import { ChatList } from '@/components/learn-form/chat';
import { WrittingSample } from '@/components/learn-form/writting-sample';

const generateOptions = [
  {
    event: 'app/generate-blogpost',
    label: 'Generate Blog',
  },
  {
    event: 'app/generate-email-template',
    label: 'Email Template',
  },
  {
    event: 'app/generate-twitter-thread',
    label: 'Twitter Thread',
  },
];

function Learn() {
  return (
    <div className="md:mt-8">
      <Heading
        title="Learn"
        description="let's learn something new about you today!"
        icon={ReaderIcon}
      />
      <div className="px-4 lg:px-8">
        <WrittingSample />
      </div>
      <div className="grid hidden grid-cols-3 gap-4 px-4 py-4 lg:px-16">
        {generateOptions.map((option) => (
          <div
            key={option.event}
            className="animate-pulse cursor-pointer rounded-md border bg-muted p-4 text-center hover:animate-none hover:bg-primary hover:text-white"
          >
            <p>{option.label}</p>
          </div>
        ))}
      </div>

      <div className="px-4 lg:px-8">
        <ChatList
          messages={[
            {
              role: 'bot',
              content: 'Welcome, let’s get your writing sample. 1 of 4.',
            },
          ]}
        />
      </div>
    </div>
  );
}

export default Learn;
