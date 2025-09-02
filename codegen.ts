import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://mttlioitimpeuzlwsgql.supabase.co/graphql/v1",
  documents: ["src/**/*.{ts,tsx}"],
  generates: {
    "./src/gql/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
