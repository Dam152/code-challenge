import Link from "next/link";
import { FavoriteButton } from "@/components/atoms/FavoriteButton";
import { NextImage } from "@/components/atoms/NextImage";
import { Text } from "@/components/atoms/Text";
import type { Character } from "@/types/generated";

type CardMovieProps = {
  card: Character | null;
};

export function CardMovie({ card }: CardMovieProps) {
  return (
    <Link
      data-testid="movie-card"
      href={`/character/${card?.id}`}
      className="w-full flex items-start  gap-[14px] rounded-[3px] bg-white shadow-[inset_-4px_0px_0px_0px_#B0C0C8] pr-[11px] relative "
    >
      <NextImage
        lazy
        src={card?.image || ""}
        alt={card?.id || ""}
        title={card?.name || ""}
        fill
        className="max-w-[87px] aspect-square w-full rounded-[6px]"
        wrapperStyle="rounded-[6px]"
        sizes="87px"
      />
      <div className="flex-1 py-[6px] flex flex-col gap-[10px]">
        <Text as="h3" className="headline-small">
          {card?.name}
        </Text>
        <Text as="p" className="body-small">
          {card?.status} • {card?.species}
        </Text>
      </div>
      <FavoriteButton character={card as Character} />
    </Link>
  );
}
