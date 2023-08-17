import { Suspense } from 'react';
import { cn } from 'ui';

import { Divider } from '@/components/divider';
import { FadeIn, FadeInStagger } from '@/components/fade-in';

import { ListItemLoader } from './loaders';

interface ListProps {
  className?: string;
  children: React.ReactNode;
}

export function List({ className, children }: ListProps) {
  return (
    <FadeInStagger>
      <ul role="list" className={cn('text-lg', className)}>
        {children}
      </ul>
    </FadeInStagger>
  );
}

interface ListItemProps {
  title?: string;
  children: React.ReactNode;
}

export function ListItem({ title, children }: ListItemProps) {
  return (
    <li className="group mt-10 first:mt-0">
      <FadeIn>
        <Divider className="pt-10 group-first:pt-0 group-first:before:hidden group-first:after:hidden">
          {title && (
            <strong className="font-display text-lg font-semibold text-foreground">{`${title}. `}</strong>
          )}
          <span className="text-lg text-muted-foreground">{children}</span>
        </Divider>
      </FadeIn>
    </li>
  );
}

interface ListItemGroupItem {
  title: string;
  content: string;
}

interface ListItemGroupProps {
  items: ListItemGroupItem[];
}

export function ListItemGroup({ items }: ListItemGroupProps) {
  return (
    <List>
      <Suspense fallback={<ListItemLoader />}>
        {items.map((item, index) => (
          <ListItem key={index} title={item.title}>
            {item.content}
          </ListItem>
        ))}
      </Suspense>
    </List>
  );
}
