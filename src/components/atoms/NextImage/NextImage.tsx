'use client';

import React from 'react';
import { ImageProps } from 'next/image';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { cn } from '../../../lib/utils/cn';

type NextImageProps = ImageProps & {
  lazy?: boolean;
  wrapperStyle?: string;
  objectFit?: 'cover' | 'contain';
  animate?: boolean;
};

export function NextImage({
  src,
  alt,
  sizes,
  lazy,
  animate,
  className = '',
  wrapperStyle = '',
  priority,
  objectFit = 'cover',
  ...props
}: NextImageProps) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: '120px',
    skip: !lazy,
    threshold: 0.3,
  });

  const imageRef = priority ? undefined : ref;

  return (
    <div className={cn('relative bg-gray-100', className, wrapperStyle)}>
      <Image
        ref={imageRef}
        src={src}
        alt={alt}
        sizes={sizes}
        loading={lazy ? 'lazy' : 'eager'}
        priority={priority}
        {...props}
        className={cn(
          'transition-opacity duration-1000 ease-in-out',
          objectFit === 'cover' ? 'object-cover' : 'object-contain',
          priority
            ? 'opacity-100'
            : lazy
            ? inView
              ? 'opacity-100'
              : 'opacity-0'
            : 'opacity-100',
          priority && 'transition-none',
          wrapperStyle
        )}
      />
    </div>
  );
}
