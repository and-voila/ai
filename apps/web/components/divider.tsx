import { cn } from 'ui';

interface DividerProps {
  className?: string;
  position?: 'top' | 'left';
  as?: React.ElementType;
  children?: React.ReactNode;
}

export function Divider({
  className,
  position = 'top',
  as: Component = 'div',
  ...props
}: DividerProps) {
  return (
    <Component
      className={cn(
        className,
        'relative text-lg text-muted-foreground before:absolute after:absolute',
        'before:bg-brand before:opacity-80 after:bg-brand after:opacity-40',
        position === 'top' &&
          'before:left-0 before:top-0 before:h-px before:w-6 after:left-8 after:right-0 after:top-0 after:h-px',
        position === 'left' &&
          'before:left-0 before:top-0 before:h-6 before:w-px after:bottom-0 after:left-0 after:top-8 after:w-px',
      )}
      {...props}
    />
  );
}
