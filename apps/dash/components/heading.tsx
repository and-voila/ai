import { cn } from 'ui';

interface HeadingProps {
  title: string;
  description: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
}

export const Heading = ({ title, description, icon: Icon }: HeadingProps) => {
  return (
    <div className="mb-8 flex items-center gap-x-3 px-4 lg:px-8">
      <div className={cn('w-fit rounded-md p-2')}>
        <Icon className={cn('h-12 w-12 text-muted-foreground')} />
      </div>
      <div>
        <h2 className="text-3xl font-medium">{title}</h2>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};
