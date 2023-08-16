import { UserButton } from '@clerk/nextjs';
import MobileSidebar from 'components/mobile-sidebar';
import { getApiLimitCount } from 'lib/api-limit';
import { checkSubscription } from 'lib/subscription';
import * as React from 'react';

import { ModeToggle } from './mode-toggle';

const Navbar = async () => {
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription();

  return (
    <div className="flex items-center p-4">
      <MobileSidebar isPro={isPro} apiLimitCount={apiLimitCount} />

      <div className="flex w-full justify-end space-x-4 lg:mr-4 lg:mt-4">
        <ModeToggle />
        <UserButton afterSignOutUrl="/" />
      </div>
    </div>
  );
};

export default Navbar;
