import { GetCharactersQuery } from '@/types/generated';
import Link from 'next/link';

type PaginationProps = {
  data: GetCharactersQuery | null;
  currentPage: number;
};

export function Pagination({ data, currentPage }: PaginationProps) {
  return (
    <div className="w-full flex justify-between gap-[16px]">
      <Link
        href={`/?page=${currentPage - 1}`}
        className={`${
          data?.characters?.info?.prev
            ? 'hover:opacity-50 transition-opacity ease-linear duration-300'
            : 'pointer-events-none cursor-not-allowed opacity-50 transition-opacity ease-linear duration-300'
        }`}
      >
        Prev
      </Link>

      <Link
        href={`/?page=${currentPage + 1}`}
        className={`${
          data?.characters?.info?.next
            ? 'hover:opacity-50 transition-opacity ease-linear duration-300'
            : 'pointer-events-none cursor-not-allowed opacity-50 transition-opacity ease-linear duration-300'
        }`}
      >
        Next
      </Link>
    </div>
  );
}
