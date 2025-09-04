import { create } from "zustand";

type SearchStoreProps = {
  searchQuery: string;
  updateQuery: (newQuery: string) => void;
};

export const useSearch = create<SearchStoreProps>((set) => ({
  searchQuery: "",
  updateQuery: (newQuery: string) =>
    set(() => ({
      searchQuery: newQuery,
    })),
}));
