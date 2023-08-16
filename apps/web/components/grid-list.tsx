import { FC } from 'react';
import { cn } from 'ui';

import { FadeIn, FadeInStagger } from '@/components/fade-in';

import { Divider } from './divider';

interface GridListProps {
  className?: string;
  children: React.ReactNode;
}

export function GridList({ className, children }: GridListProps) {
  return (
    <FadeInStagger>
      <ul
        role="list"
        className={cn(
          'grid grid-cols-1 gap-16 sm:grid-cols-2 lg:grid-cols-3',
          className,
        )}
      >
        {children}
      </ul>
    </FadeInStagger>
  );
}

interface GridListItemProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  titleColor?: string;
  textColor?: string;
}

export function GridListItem({
  title,
  children,
  className,
  titleColor = 'text-foreground',
  textColor = 'text-muted-foreground',
}: GridListItemProps) {
  return (
    <li
      className={cn(
        'before:bg-muted-foreground after:bg-muted-foreground/10',
        className,
      )}
    >
      <FadeIn>
        <Divider
          position="left"
          className={cn(
            'pl-8',
            textColor,
            'before:bg-primary before:opacity-80 after:bg-primary after:opacity-70',
          )}
        >
          {title && (
            <strong
              className={cn('font-display text-lg font-medium', titleColor)}
            >{`${title}. `}</strong>
          )}
          {children}
        </Divider>
      </FadeIn>
    </li>
  );
}

GridListItem.defaultProps = {
  titleColor: 'text-foreground font-semibold font-display',
  textColor: 'text-muted-foreground',
};

interface GridListItemGroupProps {
  items: GridListItemProps[];
}

export const GridListItemGroup: FC<GridListItemGroupProps> = ({ items }) => {
  return (
    <>
      {items.map((item) => (
        <GridListItem key={item.title} {...item} />
      ))}
    </>
  );
};
