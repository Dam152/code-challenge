"use client";
import type { ComponentProps } from "react";
import { useFavoriteList } from "@/hooks/use-favorite-list";
import { cn } from "@/lib/utils/cn";
import type { Character } from "@/types/generated";
import { Icon } from "../Icon";

type FavoriteButtonProps = ComponentProps<"button"> & {
  className?: string;
  character: Character;
};

export function FavoriteButton({
  className = "",
  character,
  ...props
}: FavoriteButtonProps) {
  const { toggleFavorite, isFavorite } = useFavoriteList();
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    toggleFavorite(character);
  };

  const favorite = isFavorite(character.id as string);

  return (
    <button
      data-testid="favorite-button"
      className={cn(
        className,
        "absolute top-[6px] right-[11px] cursor-pointer disabled:cursor-not-allowed z-20",
        favorite && "filled",
      )}
      {...props}
      onClick={handleClick}
      aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
    >
      <Icon
        type="star"
        width={18}
        height={17}
        className={cn(
          favorite ? "text-[#FFD056] " : "text-gray-400",
          "transition-colors duration-300 ease-linear",
        )}
      />
    </button>
  );
}
