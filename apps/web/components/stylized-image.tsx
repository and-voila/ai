import Image from 'next/image';
import { useId } from 'react';
import { cn } from 'ui';

const shapes = [
  {
    width: 655,
    height: 680,
    path: 'M575.7 261.1h-29.5v-69.6H389v69.6c-47 0-83.9-3.6-110.5-11-26.7-7.3-40-20.8-40-40.5 0-15.2 6.8-27 20.5-35.3 13.7-8.3 31.6-13.7 53.8-16.2 22.2-2.5 46.8-2.2 73.8.9 27 3.2 53.8 8.6 80.5 16.2V19.9C419.4 7.9 372.4 2.4 326 3.3c-46.4.9-88.6 8.4-126.7 22.4-38.1 14-68.5 34.9-91 62.9-22.6 28-33.8 62.9-33.8 104.8 0 28.6 5.6 54.8 16.7 78.6 11.1 23.8 28.4 44.6 51.9 62.4-29.2 19.1-51 41.9-65.3 68.6-14.3 26.7-21.4 55.9-21.4 87.7 0 38.8 10.3 72.3 31 100.5 20.6 28.3 48.9 49.9 84.8 64.8 35.9 14.9 77 22.4 123.4 22.4 49.5 0 93.1-8.4 130.5-25.2 37.5-16.8 66.8-40.8 88.1-71.9 21.3-31.1 31.9-68 31.9-110.5v-68.6h59v-141c-9.4-.1-19.3-.1-29.4-.1zM388.9 429.7v27.6c0 23.5-7.9 41.8-23.8 54.8s-37.2 19.5-63.8 19.5c-24.8 0-44-6.2-57.6-18.6-13.7-12.4-20.5-27.8-20.5-46.2 0-27.9 14.6-45.7 43.8-53.4 29.2-7.6 69.9-11.4 122-11.4-.1 9-.1 18.2-.1 27.7z',
  },
  {
    width: 719,
    height: 680,
    path: 'M601.7 261.4h-29.5V192H415.4v69.4c-46.9 0-83.6-3.6-110.2-10.9-26.6-7.3-39.9-20.7-39.9-40.4 0-15.2 6.8-26.9 20.4-35.1 13.6-8.2 31.5-13.6 53.7-16.2 22.2-2.5 46.7-2.2 73.6.9 26.9 3.2 53.7 8.6 80.3 16.2V21.1C445.9 9.1 399 3.5 352.8 4.5c-46.2.9-88.4 8.4-126.4 22.3s-68.3 34.8-90.7 62.7C113.2 117.4 102 152.2 102 194c0 28.5 5.5 54.6 16.6 78.4 11.1 23.8 28.3 44.5 51.8 62.2-29.1 19-50.8 41.8-65.1 68.4-14.3 26.6-21.4 55.7-21.4 87.4 0 38.6 10.3 72.1 30.9 100.2 20.6 28.2 48.8 49.7 84.5 64.6 35.8 14.9 76.8 22.3 123 22.3 49.4 0 92.8-8.4 130.2-25.2 37.4-16.8 66.6-40.7 87.9-71.7 21.2-31 31.8-67.8 31.8-110.2V402h59V261.4h-29.5zM415.5 429.6v27.5c0 23.4-7.9 41.7-23.8 54.6-15.8 13-37 19.5-63.7 19.5-24.7 0-43.9-6.2-57.5-18.5-13.6-12.3-20.4-27.7-20.4-46.1 0-27.9 14.6-45.6 43.7-53.2 29.1-7.6 69.7-11.4 121.6-11.4.1 8.9.1 18.1.1 27.6z',
  },
  {
    width: 719,
    height: 680,
    path: 'M601.7 261.4h-29.5V192H415.4v69.4c-46.9 0-83.6-3.6-110.2-10.9-26.6-7.3-39.9-20.7-39.9-40.4 0-15.2 6.8-26.9 20.4-35.1 13.6-8.2 31.5-13.6 53.7-16.2 22.2-2.5 46.7-2.2 73.6.9 26.9 3.2 53.7 8.6 80.3 16.2V21.1C445.9 9.1 399 3.5 352.8 4.5c-46.2.9-88.4 8.4-126.4 22.3s-68.3 34.8-90.7 62.7C113.2 117.4 102 152.2 102 194c0 28.5 5.5 54.6 16.6 78.4 11.1 23.8 28.3 44.5 51.8 62.2-29.1 19-50.8 41.8-65.1 68.4-14.3 26.6-21.4 55.7-21.4 87.4 0 38.6 10.3 72.1 30.9 100.2 20.6 28.2 48.8 49.7 84.5 64.6 35.8 14.9 76.8 22.3 123 22.3 49.4 0 92.8-8.4 130.2-25.2 37.4-16.8 66.6-40.7 87.9-71.7 21.2-31 31.8-67.8 31.8-110.2V402h59V261.4h-29.5zM415.5 429.6v27.5c0 23.4-7.9 41.7-23.8 54.6-15.8 13-37 19.5-63.7 19.5-24.7 0-43.9-6.2-57.5-18.5-13.6-12.3-20.4-27.7-20.4-46.1 0-27.9 14.6-45.6 43.7-53.2 29.1-7.6 69.7-11.4 121.6-11.4.1 8.9.1 18.1.1 27.6z',
  },
];

export interface StylizedImageProps {
  shape?: 0 | 1 | 2;
  className?: string;
  src: string;
  sizes: string;
  alt: string;
}

export function StylizedImage({
  shape = 0,
  className,
  alt,
  ...props
}: StylizedImageProps) {
  const id = useId();
  const { width, height, path } = shapes[shape];

  return (
    <div className={cn(className, 'relative flex aspect-[719/680] w-full')}>
      <svg viewBox={`0 0 ${width} ${height}`} fill="none" className="h-full">
        <g clipPath={`url(#${id}-clip)`} className="group">
          <g className="origin-center scale-100 grayscale transition duration-500 motion-safe:group-hover:scale-105">
            <foreignObject width={width} height={height}>
              <Image
                alt={alt}
                className="w-full bg-gray-100 object-cover"
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
            className="stroke-gray-950/10"
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
