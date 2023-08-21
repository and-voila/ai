'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  CodeIcon,
  DashboardIcon,
  GearIcon,
  ImageIcon,
  Pencil1Icon,
  ReaderIcon,
  SpeakerLoudIcon,
  VideoIcon,
} from 'ui';
import { cn } from 'ui';

import { FreeCounter } from './free-counter';
import { Logo, Logomark } from './logo';

const routes = [
  {
    label: 'Home',
    icon: DashboardIcon,
    href: '/dashboard',
  },
  {
    label: 'Write',
    icon: Pencil1Icon,
    href: '/write',
  },
  {
    label: 'Image',
    icon: ImageIcon,
    href: '/image',
  },
  {
    label: 'Video',
    icon: VideoIcon,
    href: '/video',
  },
  {
    label: 'Music',
    icon: SpeakerLoudIcon,
    href: '/music',
  },
  {
    label: 'Code',
    icon: CodeIcon,
    href: '/code',
  },
  {
    label: 'Learn',
    icon: ReaderIcon,
    href: '/learn',
  },
  {
    label: 'Settings',
    icon: GearIcon,
    href: '/settings',
  },
];

interface SidebarProps {
  apiLimitCount: number;
  isPro: boolean;
}

const Sidebar = ({ apiLimitCount, isPro = false }: SidebarProps) => {
  const pathname = usePathname();
  return (
    <div className="flex h-full flex-col space-y-4 border-r bg-slate-200 py-4 dark:bg-background">
      <div className="flex-1 px-3 py-2">
        <Link href="/dashboard" className="mb-14 flex items-center pl-3">
          <div className="relative mr-2 h-8 w-8">
            <Logomark className="h-8 w-8 sm:hidden" />
            <Logo className="hidden h-8 w-auto sm:block " fillOnHover />
          </div>
        </Link>
        <div className="space-y-1 md:mt-8">
          {routes.map((route) => (
            <Link
              href={route.href}
              key={route.href}
              className={cn(
                'group flex w-full cursor-pointer justify-start rounded-lg p-3 transition hover:bg-muted-foreground hover:text-primary-foreground',
                pathname === route.href
                  ? 'bg-muted-foreground/30 text-foreground'
                  : 'text-foreground',
              )}
            >
              <div className="flex flex-1 items-center">
                <route.icon className={cn('mr-3 h-5 w-5', route)} />
                {route.label}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <FreeCounter isPro={isPro} apiLimitCount={apiLimitCount} />
    </div>
  );
};

export default Sidebar;
