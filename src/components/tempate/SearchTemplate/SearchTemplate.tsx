"use client";
import { useQuery } from "@apollo/client/react";
import { useEffect, useState } from "react";
import { CardMovie } from "@/components/molecules/CardMovie";
import { CardMovieSkeleton } from "@/components/molecules/CardMovie/CardMovieSkeleton";
import { Pagination } from "@/components/molecules/Pagination/Pagination";
import { GET_CHARACTERS } from "@/queries/characters";
import { useSearch } from "@/store/search";
import type { Character, GetCharactersQuery } from "@/types/generated";
import { SearchForm } from "./SearchForm/SearchForm";

type SearchTemplateProps = {
  responseNotFound: {
    title: string;
    subtitle: string;
  };
  placeholder: string;
};

export function SearchTemplate({
  responseNotFound,
  placeholder,
}: SearchTemplateProps) {
  const { searchQuery, updateQuery } = useSearch();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data, loading } = useQuery<GetCharactersQuery>(GET_CHARACTERS, {
    variables: {
      page: currentPage,
      filter: searchQuery ? { name: searchQuery } : {},
    },
  });

  const totalPages = data?.characters?.info?.pages ?? 1;
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    updateQuery("");
    setCurrentPage(1);
  }, [updateQuery]);

  if (loading) {
    return (
      <div className="grid gap-[19px]">
        <SearchForm placeholder={placeholder} />
        <div className="grid-container">
          {Array.from({ length: 19 }).map((_) => (
            <CardMovieSkeleton key={`skeleton-search-${Math.random()}`} />
          ))}
        </div>
      </div>
    );
  }

  if (
    data &&
    (!data.characters?.results || data.characters.results.length === 0)
  ) {
    return (
      <div className="grid gap-[19px]">
        <SearchForm placeholder={placeholder} />
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="text-gray-500 text-lg mb-2">
            {responseNotFound.title}
          </div>
          {searchQuery && (
            <div className="text-gray-400 text-sm">
              {responseNotFound.subtitle} "{searchQuery}"
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-[19px]">
      <SearchForm placeholder={placeholder} />
      <div className="grid-container">
        {data?.characters?.results?.map((character) => (
          <CardMovie key={character?.id} card={character as Character} />
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
