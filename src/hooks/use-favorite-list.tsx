"use client";

import { usePathname } from "next/navigation";
import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import type { Character } from "@/types/generated";
import { getClientDictionary, type Locale } from "@/utils/client-translations";
import { useToast } from "./use-toast";

type FavoriteListContextType = {
  favorites: Character[];
  addToFavorites: (character: Character) => void;
  removeFromFavorites: (characterId: string) => void;
  toggleFavorite: (character: Character) => void;
  isFavorite: (characterId: string) => boolean;
  loading: boolean;
};

const FavoriteListContext = createContext<FavoriteListContextType | undefined>(
  undefined,
);

type FavoriteListProviderProps = {
  children: ReactNode;
};

export function FavoriteListProvider({ children }: FavoriteListProviderProps) {
  const [favorites, setFavorites] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [dict, setDict] = useState<{
    addedToFavorites: string;
    removedFromFavorites: string;
  }>();
  const { showToast } = useToast();
  const pathName = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("favoriteList");
      if (stored === null) {
        localStorage.setItem("favoriteList", JSON.stringify([]));
      } else {
        try {
          const parsedFavorites = JSON.parse(stored);
          setFavorites(parsedFavorites);
        } catch (error) {
          console.error("Error parsing favorites from localStorage:", error);
          localStorage.setItem("favoriteList", JSON.stringify([]));
        }
      }
      setLoading(false);

      async function getLocaleToast() {
        const locale = pathName.split("/")[1] as Locale;
        const dictFetch = (await getClientDictionary(locale)).toast;
        setDict(dictFetch);
      }

      getLocaleToast();
    }
  }, [pathName]);

  const addToFavorites = (character: Character) => {
    setFavorites((prev) => {
      const newFavorites = [...prev, character];
      localStorage.setItem("favoriteList", JSON.stringify(newFavorites));
      return newFavorites;
    });

    setTimeout(() => {
      showToast(`${character.name} ${dict?.addedToFavorites}`, "success");
    }, 0);
  };

  const removeFromFavorites = (characterId: string) => {
    const removedCharacter = favorites.find((char) => char.id === characterId);

    setFavorites((prev) => {
      const newFavorites = prev.filter((char) => char.id !== characterId);
      localStorage.setItem("favoriteList", JSON.stringify(newFavorites));
      return newFavorites;
    });

    if (removedCharacter) {
      setTimeout(() => {
        showToast(
          `${removedCharacter.name} ${dict?.removedFromFavorites}`,
          "info",
        );
      }, 0);
    }
  };

  const toggleFavorite = (character: Character) => {
    const isCurrentlyFavorite = favorites.some(
      (fav) => fav.id === character.id,
    );
    if (isCurrentlyFavorite && character.id) {
      removeFromFavorites(character.id);
    } else {
      addToFavorites(character);
    }
  };

  const isFavorite = (characterId: string) => {
    return favorites.some((fav) => fav.id === characterId);
  };

  const value = {
    favorites,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    isFavorite,
    loading,
  };

  return (
    <FavoriteListContext.Provider value={value}>
      {children}
    </FavoriteListContext.Provider>
  );
}

export function useFavoriteList() {
  const context = useContext(FavoriteListContext);
  if (context === undefined) {
    throw new Error(
      "useFavoriteList must be used within a FavoriteListProvider",
    );
  }
  return context;
}
