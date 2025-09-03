'use server';

import { GET_CHARACTERS } from '@/queries/characters';
import { getClient } from '../apollo-client';
import { GetCharactersQuery } from '@/types/generated';

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
