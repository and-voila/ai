import Image from 'next/image';
import { useId } from 'react';
import { cn } from 'ui';

const shapes = [
  {
    width: 655,
    height: 680,
    path: 'M637.2 481.7c-8.1-13-18.6-23.5-31.7-31.3-8.2-4.9-17-8.2-26.4-10h51c1.1-60 1.9-167.1 2.5-227.9.5-60.9 1.1-121.3 1.7-181.3H488.4c1.1 60 1.9 120.5 2.5 181.3.1 14.5.3 31.7.4 50.2h-28.6v-64.8H316.2v64.8c-43.8 0-78.2-3.4-103-10.2-24.9-6.8-37.3-19.4-37.3-37.8 0-14.2 6.4-25.2 19.1-32.9 12.7-7.7 29.5-12.7 50.2-15.1 20.7-2.4 43.7-2.1 68.8.9 25.2 3 50.2 8 75.1 15.1V38c-44.4-11.2-88.2-16.4-131.5-15.5-43.2.9-82.6 7.9-118.1 20.9C104 56.4 75.7 76 54.7 102c-21 26.1-31.5 58.6-31.5 97.7 0 26.6 5.2 51.1 15.5 73.3C49 295.1 65.1 314.5 87 331.1c-27.2 17.8-47.5 39.1-60.8 64-13.3 24.9-20 52.1-20 81.7 0 36.1 9.6 67.4 28.9 93.7 19.2 26.4 45.6 46.5 79.1 60.4 33.4 13.9 71.8 20.9 115 20.9 46.2 0 86.7-7.9 121.7-23.5 34.9-15.7 62.3-38 82.2-67.1 19.8-29 29.8-63.4 29.8-103v-64h29.5c.1 17.1.3 32.9.4 46.3h51.4c-16.9 3.2-31.8 11.1-44.7 23.8-17.2 17-25.8 37.1-25.8 60.4 0 15.6 3.9 30 11.7 43.3 7.8 13.3 18.5 23.9 32.1 31.7 13.6 7.8 28.5 11.7 44.6 11.7s30.7-3.9 43.8-11.7c13.1-7.8 23.6-18.3 31.7-31.7 8-13.3 12.1-27.8 12.1-43.3-.4-15.6-4.4-29.9-12.5-43zm-321-61.8v25.8c0 21.9-7.4 38.9-22.2 51.1-14.8 12.1-34.6 18.2-59.5 18.2-23.1 0-41-5.8-53.7-17.3-12.7-11.5-19.1-25.9-19.1-43.1 0-26.1 13.6-42.6 40.9-49.7 27.2-7.1 65.1-10.7 113.7-10.7-.1 8.2-.1 16.8-.1 25.7z',
  },
];

export interface StylizedImageProps {
  className?: string;
  src: string;
  sizes: string;
  alt: string;
}

export function StylizedImage({
  className,
  alt,
  ...props
}: StylizedImageProps) {
  const id = useId();
  const { width, height, path } = shapes[0];

  return (
    <div className={cn(className, 'relative flex aspect-[719/680] w-full')}>
      <svg viewBox={`0 0 ${width} ${height}`} fill="none" className="h-full">
        <g clipPath={`url(#${id}-clip)`} className="group">
          <g className="origin-center scale-100 grayscale transition duration-500 motion-safe:group-hover:scale-105">
            <foreignObject width={width} height={height}>
              <Image
                alt={alt}
                className="w-full bg-brand object-cover"
                style={{ aspectRatio: `${width} / ${height}` }}
                {...props}
                width={width}
                height={height}
              />
            </foreignObject>
          </g>
          <use
            href={`#${id}-shape`}
            strokeWidth="2"
            className="stroke-border"
          />
        </g>
        <defs>
          <clipPath id={`${id}-clip`}>
            <path
              id={`${id}-shape`}
              d={path}
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </clipPath>
        </defs>
      </svg>
    </div>
  );
}
