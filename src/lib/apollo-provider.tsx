"use client";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";
import type { ReactNode } from "react";

type ApolloProviderProps = {
  children: ReactNode;
};

export default function ApolloProviderInit({ children }: ApolloProviderProps) {
  const client = new ApolloClient({
    link: new HttpLink({
      uri:
        process.env.NEXT_PUBLIC_GRAPHQL_URL ||
        "https://mttlioitimpeuzlwsgql.supabase.co/graphql/v1",
    }),

    cache: new InMemoryCache(),
  });

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
