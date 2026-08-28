import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";
import { deskStructure } from "./deskStructure";

/**
 * Sanity Studio configuration for Sterna Aveiro Experiences.
 *
 * Project ID: jghpyuue
 * Dataset:    production
 * Deploy to:  sterna-aveiro.sanity.studio
 *
 * Editors are Sandra + team. Sign in with the email they were invited with.
 */
export default defineConfig({
  name: "sterna-aveiro",
  title: "Sterna Aveiro",
  projectId: "jghpyuue",
  dataset: "production",
  plugins: [
    structureTool({ structure: deskStructure }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
});
