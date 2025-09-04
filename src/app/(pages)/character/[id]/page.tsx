import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FavoriteButton } from "@/components/atoms/FavoriteButton";
import { NextImage } from "@/components/atoms/NextImage";
import { Text } from "@/components/atoms/Text";
import { PageHeader } from "@/components/molecules/PageHeader";
import { GetCharacterById } from "@/lib/actions/characters";
import type { Character } from "@/types/generated";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { id } = await params;
  const data = await GetCharacterById(id);
  const character = data?.character;
  if (!character) {
    return {};
  }

  return {
    title: `${process.env.NEXT_APP_NAME} | ${character.name}`,
    description: character.type,
    openGraph: {
      title: character.name || "Character",
      description: character.type || "Character details",
      images: [
        {
          url: character.image || "",
        },
      ],
    },
  };
}

export default async function page({ params }: Params) {
  const { id } = await params;
  const data = await GetCharacterById(id);
  const character = data?.character;
  if (!character) {
    notFound();
  }

  console.log(character);

  return (
    <div className="grid gap-[19px]">
      <PageHeader
        text={"Character"}
        labelLink={"back"}
        href={"/"}
        icon="prev"
      />
      <div className="w-full flex justify-between gap-8 max-md:flex-col max-md:justify-start">
        <NextImage
          src={character.image || ""}
          alt={character.id || ""}
          title={character.name || ""}
          fill
          lazy
          className="w-full aspect-square object-cover rounded-[8px] shadow-xl"
          wrapperStyle="rounded-[8px]"
          sizes=""
        />
        <div className="flex-1 flex flex-col gap-4">
          <Text as="h1" className="headline-small">
            {character.name}
          </Text>

          <div className="flex gap-1">
            <div className="body-small p-2 rounded-[200px] bg-green-600 text-white shadow-xl">
              {character.species}
            </div>
            <div className="body-small p-2 rounded-[200px] bg-violet-600 text-white shadow-xl">
              {character.gender}
            </div>
            <div className="body-small p-2 rounded-[200px] bg-blue-400 text-white shadow-xl">
              {character.status}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <Text as="h2">Origin</Text>
            <Text as="p" className="body-small text-neutral-600">
              {character.origin?.name}
            </Text>
            <Text as="p" className="body-small text-neutral-600">
              {character.origin?.dimension}
            </Text>
          </div>
          <div className="flex flex-col gap-1">
            <Text as="h2">Location</Text>
            <Text as="p" className="body-small text-neutral-600">
              {character.location?.name}
            </Text>
          </div>
          <div className="flex flex-col gap-1">
            <Text as="h2">Episodies</Text>
            <Text as="p" className="body-small text-neutral-600">
              {character.episode.length} episodes
            </Text>
          </div>
          <div className=" w-full">
            <Text as="p" className=" body-small text-neutral-600">
              Added to favorites
            </Text>
            <FavoriteButton
              character={character as Character}
              className="!relative ml-[9px] "
            />
          </div>
        </div>
      </div>
    </div>
  );
}
