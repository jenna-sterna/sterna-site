import { defineCliConfig } from "sanity/cli";

/**
 * CLI config for the Sanity Studio.
 * Run `npx sanity deploy` to publish the Studio.
 * When prompted for a subdomain, use: sterna-aveiro
 */
export default defineCliConfig({
  api: {
    projectId: "jghpyuue",
    dataset: "production",
  },
  studioHost: "sterna-aveiro",
  autoUpdates: false,
});
