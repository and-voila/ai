import { cn } from 'ui/lib/utils';

interface ContainerProps {
  className?: string;
  children: React.ReactNode;
  as?: React.ElementType;
}

export function Container({
  as: Component = 'div',
  className,
  children,
}: ContainerProps) {
  return (
    <Component className={cn('mx-auto max-w-7xl px-6 lg:px-8', className)}>
      <div className="mx-auto max-w-2xl lg:max-w-none">{children}</div>
    </Component>
  );
}
