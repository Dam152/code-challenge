'use client';

import { useState } from 'react';
import { CardMovie } from '@/components/molecules/CardMovie';
import { CardMovieSkeleton } from '@/components/molecules/CardMovie/CardMovieSkeleton/CardMovieSkeleton';
import { Pagination } from '@/components/molecules/Pagination/Pagination';
import { useFavoriteList } from '@/hooks/use-favorite-list';

export function FavoriteTemplate({ response }: { response: string }) {
  const { favorites, loading } = useFavoriteList();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 19;

  if (loading) {
    return (
      <div className="flex flex-col gap-[19px]">
        <div className="grid-container">
          {...Array.from({ length: itemsPerPage }).map((_) => (
            <CardMovieSkeleton key={`skeleton-${Math.random()}`} />
          ))}
        </div>
      </div>
    );
  }

  if (favorites.length === 0 || !favorites) {
    return <div>{response}</div>;
  }

  const totalPages = Math.ceil(favorites.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = favorites.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-col gap-[19px]">
      <div className="grid-container">
        {currentItems.map((c) => (
          <CardMovie key={c.id} card={c} />
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
