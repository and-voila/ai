import React from 'react';
import { ReaderIcon } from 'ui';

import { Heading } from '@/components/heading';
import { ChatList } from '@/components/learn-form/chat';
import { WrittingSample } from '@/components/learn-form/writting-sample';

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
