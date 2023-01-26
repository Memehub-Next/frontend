import { defineConfig } from "@openapi-codegen/cli";
import { generateReactQueryComponents, generateSchemaTypes } from "@openapi-codegen/typescript";
export default defineConfig({
  memehubRestBE: {
    from: { source: "url", url: "http://localhost:5000/api-json" },
    outputDir: "src/rest",
    to: async (context) => {
      const { schemasFiles } = await generateSchemaTypes(context, {});
      await generateReactQueryComponents(context, { schemasFiles });
    },
  },
});
