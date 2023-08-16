import * as React from 'react';

import { useMDXComponent } from 'next-contentlayer/hooks';
import { ImgHTMLAttributes } from 'react';

import { Divider } from './divider';
import {
  GrayscaleTransitionImage,
  GrayscaleTransitionImageProps,
} from './grayscale-transition-image';
import {
  StatList,
  StatListItem,
  StatListItemProps,
  StatListProps,
} from './stat-list';
import { cn } from 'ui';

interface MdxProps {
  code: string;
}

export function Mdx({ code }: MdxProps) {
  const Component = useMDXComponent(code);

  return (
    <div className="prose dark:prose-invert md:prose-lg">
      <Component
        components={{
          a: (props) => (
            <a
              {...props}
              className="hover text-primary decoration-2 underline-offset-4"
            />
          ),
          blockquote: (props) => (
            <blockquote {...props} className="mt-4 font-bold" />
          ),
          hr: (props) => <hr {...props} className="mt-4 text-base font-bold" />,
          img: function Img({
            className,
            ...props
          }: ImgHTMLAttributes<HTMLImageElement>) {
            const { src, alt, width, height } =
              props as GrayscaleTransitionImageProps;

            return (
              <div
                className={cn(
                  'group isolate my-10 overflow-hidden rounded-4xl bg-muted max-sm:-mx-6',
                  className,
                )}
              >
                <GrayscaleTransitionImage
                  src={src}
                  alt={alt}
                  width={width}
                  height={height}
                  sizes="(min-width: 768px) 42rem, 100vw"
                  className="aspect-[16/10] w-full object-cover"
                />
              </div>
            );
          },
          StatList: function StatListComponent({
            className,
            ...props
          }: StatListProps) {
            return (
              <StatList
                className={cn('my-32 !max-w-none', className)}
                {...props}
              />
            );
          },
          StatListItem: (props: StatListItemProps) => (
            <StatListItem {...props} />
          ),
          table: function Table({ className, ...props }) {
            return (
              <div
                className={cn(
                  'my-10 max-sm:-mx-6 max-sm:flex max-sm:overflow-x-auto',
                  className,
                )}
              >
                <div className="max-sm:min-w-full max-sm:flex-none max-sm:px-6">
                  <table {...props} />
                </div>
              </div>
            );
          },
          TopTip: function TopTipComponent({
            className,
            children,
          }: {
            className?: string;
            children: React.ReactNode;
          }) {
            return (
              <Divider position="left" className={cn('my-10 pl-8', className)}>
                <p className="font-display text-sm font-bold uppercase tracking-widest text-foreground">
                  Top tip
                </p>
                <div className="mt-4">{children}</div>
              </Divider>
            );
          },
        }}
      />
    </div>
  );
}
