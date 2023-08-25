import Image from 'next/image';
import { cn } from 'ui';

import { Divider } from '@/components/divider';

interface BlockquoteProps {
  author: {
    name: string;
    role: string;
  };
  image?: {
    src: string;
    alt: string;
  };
  children: React.ReactNode;
  className?: string;
}

function BlockquoteWithImage({
  author,
  image,
  children,
  className,
}: BlockquoteProps) {
  return (
    <figure
      className={cn(
        'grid grid-cols-[auto,1fr] items-center gap-x-4 gap-y-8 sm:grid-cols-12 sm:grid-rows-[1fr,auto,auto,1fr] sm:gap-x-10 lg:gap-x-16',
        className,
      )}
    >
      <blockquote className="md:text-lgsm:col-span-7 col-span-2 text-xl/7 text-muted-foreground sm:col-start-6 sm:row-start-2">
        {typeof children === 'string' ? <p>{children}</p> : children}
      </blockquote>
      <div className="col-start-1 row-start-2 overflow-hidden rounded-xl sm:col-span-5 sm:row-span-full sm:rounded-3xl">
        <Image
          alt={image?.alt ?? ''}
          src={image?.src ?? ''}
          width={100}
          height={100}
          sizes="(min-width: 1024px) 17.625rem, (min-width: 768px) 16rem, (min-width: 640px) 40vw, 3rem"
          className="h-12 w-12 object-cover grayscale sm:aspect-[7/9] sm:h-auto sm:w-full"
        />
      </div>
      <figcaption className="text-sm text-foreground sm:col-span-7 sm:row-start-3 sm:text-base md:text-lg">
        <span className="font-display font-semibold">{author.name}</span>
        <span className="hidden font-semibold sm:inline">, </span>
        <br className="sm:hidden" />
        <span className="font-display sm:font-semibold">{author.role}</span>
      </figcaption>
    </figure>
  );
}

function BlockquoteWithoutImage({
  author,
  children,
  className,
}: BlockquoteProps) {
  return (
    <Divider position="left" className={cn('pl-8', className)}>
      <figure className="text-sm">
        <blockquote className="text-base text-foreground md:text-lg [&>*]:relative [&>:first-child]:before:absolute [&>:first-child]:before:right-full [&>:first-child]:before:content-['“'] [&>:last-child]:after:content-['”']">
          {typeof children === 'string' ? <p>{children}</p> : children}
        </blockquote>
        <figcaption className="mt-6 font-display font-semibold text-foreground">
          {author.name}, {author.role}
        </figcaption>
      </figure>
    </Divider>
  );
}

export function Blockquote(props: BlockquoteProps) {
  if (props.image) {
    return <BlockquoteWithImage {...props} />;
  }

  return <BlockquoteWithoutImage {...props} />;
}
