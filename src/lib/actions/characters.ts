"use server";

import { GET_CHARACTERS } from "@/queries/characters";
import type { GetCharactersQuery } from "@/types/generated";
import { getClient } from "../apollo-client";

export async function getCharacters(currentPage: number, filter?: string) {
  const { data } = await getClient().query<GetCharactersQuery>({
    query: GET_CHARACTERS,
    variables: {
      page: currentPage,
      filter: filter ? { name: filter } : undefined,
    },
  });

  return data;
}
