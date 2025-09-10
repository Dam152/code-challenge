"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { debounceTime, distinctUntilChanged, Subject } from "rxjs";
import * as z from "zod";
import { Text } from "@/components/atoms/Text";
import { useSearch } from "@/store/search";

const SearchSchema = z.object({
  query: z.string().min(1, "Search query must be at least 1 characters long"),
});

type SearchFormData = z.infer<typeof SearchSchema>;

export function SearchForm({ placeholder }: { placeholder: string }) {
  const {
    register,
    formState: { errors },
    watch,
  } = useForm<SearchFormData>({
    resolver: zodResolver(SearchSchema),
  });

  const query = watch("query");
  const searchSubject = useMemo(() => new Subject<string>(), []);

  const { updateQuery } = useSearch();

  useEffect(() => {
    const subscription = searchSubject
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((query) => {
        updateQuery(query);
      });

    return () => subscription.unsubscribe();
  }, [searchSubject, updateQuery]);

  useEffect(() => {
    if (query !== undefined) {
      searchSubject.next(query);
    }
  }, [query, searchSubject]);

  return (
    <form
      className="w-full flex flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      {errors.query && (
        <Text className="body-small text-red-500">{errors.query.message}</Text>
      )}
      <input
        data-testid="search-input"
        type="text"
        placeholder={placeholder}
        className="border border-gray-500 p-2 rounded w-full"
        {...register("query", {
          required: true,
        })}
      />
    </form>
  );
}
