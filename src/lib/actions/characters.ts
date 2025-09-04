"use server";

import { GET_CHARACTER, GET_CHARACTERS } from "@/queries/characters";
import type { GetCharacterQuery, GetCharactersQuery } from "@/types/generated";
import { getClient } from "../apollo-client";

export async function getCharacters(currentPage: number, filter?: string) {
  try {
    const { data } = await getClient().query<GetCharactersQuery>({
      query: GET_CHARACTERS,
      variables: {
        page: currentPage,
        filter: filter ? { name: filter } : undefined,
      },
    });

    return data;
  } catch (error: unknown) {
    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred",
    );
  }
}

export async function GetCharacterById(id: string) {
  try {
    const { data } = await getClient().query<GetCharacterQuery>({
      query: GET_CHARACTER,
      variables: { id },
    });

    return data;
  } catch (error: unknown) {
    throw new Error(
      error instanceof Error ? error.message : "An unknown error occurred",
    );
  }
}
