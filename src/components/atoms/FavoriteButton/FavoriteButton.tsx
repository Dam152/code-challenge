'use client';
import { cn } from '@/lib/utils/cn';
import { ComponentProps } from 'react';
import { Icon } from '../Icon';

type FavoriteButtonProps = ComponentProps<'button'> & {
  className?: string;
};

export function FavoriteButton({
  className = '',
  ...props
}: FavoriteButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
  };

  return (
    <button
      className={cn(
        className,
        'absolute top-[6px] right-[11px] cursor-pointer disabled:cursor-not-allowed z-20'
      )}
      {...props}
      onClick={handleClick}
      aria-label="Add to favorites"
    >
      <Icon type="star" width={18} height={17} />
    </button>
  );
}
