import React from 'react';
import { ReaderIcon } from 'ui';

import { Heading } from '@/components/heading';
import { ChatList } from '@/components/learn-form/chat';

function Learn() {
  return (
    <div className="md:mt-8">
      <Heading
        title="Learn"
        description="let's learn something new about you today!"
        icon={ReaderIcon}
      />

      <div className="px-4 lg:px-8">
        <ChatList />
      </div>
    </div>
  );
}

export default Learn;