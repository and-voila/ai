import { Divider } from '@/components/divider';
import { FadeIn, FadeInStagger } from '@/components/fade-in';

export interface StatListProps {
  className?: string;
  children: React.ReactNode;
}

export function StatList({ children, ...props }: StatListProps) {
  return (
    <FadeInStagger {...props}>
      <dl className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:auto-cols-fr lg:grid-flow-col lg:grid-cols-none">
        {children}
      </dl>
    </FadeInStagger>
  );
}

export interface StatListItemProps {
  label: string;
  value: string;
}

export function StatListItem({ label, value }: StatListItemProps) {
  return (
    <Divider as={FadeIn} position="left" className="flex flex-col-reverse pl-8">
      <dt className="mt-2 text-sm text-muted-foreground">{label}</dt>
      <dd className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
        {value}
      </dd>
    </Divider>
  );
}
