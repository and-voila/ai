import { cn } from 'ui';

export interface TagListProps {
  className?: string;
  children: React.ReactNode;
}

export function TagList({ className, children }: TagListProps) {
  return (
    <ul role="list" className={cn(className, 'flex list-none flex-wrap gap-4')}>
      {children}
    </ul>
  );
}

export interface TagListItemProps {
  className?: string;
  children: React.ReactNode;
}

export function TagListItem({ className, children }: TagListItemProps) {
  return (
    <li
      className={cn(
        'rounded-full bg-brand px-4 py-2 text-sm text-gray-100 md:text-base',
        className,
      )}
    >
      {children}
    </li>
  );
}
