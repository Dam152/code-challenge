import Link from "next/link";
import type { GetCharactersQuery } from "@/types/generated";

type PaginationProps = {
  data?: GetCharactersQuery | null;
  currentPage: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
};

export function Pagination({
  data,
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  const isClientSide = !!onPageChange && !!totalPages;

  if (isClientSide) {
    return (
      <div className="w-full flex justify-between gap-[16px]">
        <button
          type="button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`${
            currentPage === 1
              ? "pointer-events-none cursor-not-allowed opacity-50 transition-opacity ease-linear duration-300"
              : "hover:opacity-50 transition-opacity ease-linear duration-300"
          }`}
        >
          Prev
        </button>

        <span className="flex items-center">
          {currentPage} / {totalPages}
        </span>

        <button
          type="button"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`${
            currentPage === totalPages
              ? "pointer-events-none cursor-not-allowed opacity-50 transition-opacity ease-linear duration-300"
              : "hover:opacity-50 transition-opacity ease-linear duration-300"
          }`}
        >
          Next
        </button>
      </div>
    );
  }

  return (
    <div className="w-full flex items-center justify-between gap-[16px]">
      <Link
        href={`/?page=${currentPage - 1}`}
        className={`${
          data?.characters?.info?.prev
            ? "hover:opacity-50 transition-opacity ease-linear duration-300"
            : "pointer-events-none cursor-not-allowed opacity-50 transition-opacity ease-linear duration-300"
        }`}
      >
        Prev
      </Link>
      <span className="flex items-center">
        {currentPage} / {data?.characters?.info?.pages}
      </span>
      <Link
        href={`/?page=${currentPage + 1}`}
        className={`${
          data?.characters?.info?.next
            ? "hover:opacity-50 transition-opacity ease-linear duration-300"
            : "pointer-events-none cursor-not-allowed opacity-50 transition-opacity ease-linear duration-300"
        }`}
      >
        Next
      </Link>
    </div>
  );
}
