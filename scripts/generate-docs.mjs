import { generateFiles } from "fumadocs-openapi";
import { createOpenAPI } from "fumadocs-openapi/server";
import { rimraf } from "rimraf";

const INPUT = "./public/parseable-api-schema-cleaned.yaml";
const OUTPUT = "./content/docs/api/v1";

const openapi = createOpenAPI({
  input: [INPUT],
});

async function generateDocs() {
  const apiDir = "./content/docs/api";

  await rimraf(`${apiDir}/*`, {
    glob: {
      ignore: ["**/index.mdx"],
      absolute: false,
    },
  });

  await generateFiles({
    input: openapi,
    output: OUTPUT,
    per: "operation",
    includeDescription: true,
    // Add baseUrl to ensure correct path resolution
    baseUrl: '/',
    // Customize the document path in the generated MDX
    transform: (content) => {
      return content.replace(
        /document=\{"([^"]+)"\}/g,
        'document={"public/parseable-api-schema-cleaned.yaml"}'
      );
    },
  });

  console.log("API documentation generated successfully");

  const { execSync } = await import("child_process");

  try {
    console.log("Fixing API documentation path parameters...");
    execSync("node scripts/fix-api-docs.mjs", { stdio: "inherit" });
  } catch (error) {
    console.error("Error fixing API documentation:", error);
    process.exit(1);
  }
}

generateDocs().catch((error) => {
  console.error("Error generating documentation:", error);
  process.exit(1);
});