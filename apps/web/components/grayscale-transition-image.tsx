'use client';

import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

const MotionImage = motion(Image);

export interface GrayscaleTransitionImageProps {
  src: string;
  width: number;
  height: number;
  alt: string;
  quality?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
}

export function GrayscaleTransitionImage({
  alt,
  ...props
}: GrayscaleTransitionImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
  });
  const grayscale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0, 1]);
  const filter = useMotionTemplate`grayscale(${grayscale})`;

  return (
    <div ref={ref} className="group relative">
      <MotionImage
        style={{
          filter: filter.get(),
        }}
        alt={alt}
        {...props}
      />
      <div
        className="pointer-events-none absolute left-0 top-0 w-full opacity-0 transition duration-300 group-hover:opacity-100"
        aria-hidden="true"
      >
        <Image alt={alt} {...props} />
      </div>
    </div>
  );
}
