import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema:
    process.env.NEXT_PUBLIC_GRAPHQL_URL ||
    "https://mttlioitimpeuzlwsgql.supabase.co/graphql/v1",

  documents: ["src/**/*.tsx"],
  generates: {
    "./src/types/generated.ts": {
      plugins: ["typescript"],
    },
  },
  ignoreNoDocuments: true,
};

export default config;
