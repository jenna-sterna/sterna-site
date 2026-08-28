// @ts-check
import { defineConfig } from "astro/config";

/**
 * Vite `define` blocks are used to inject safe build-time defaults for the
 * Sanity project ID and dataset. If the environment already provides
 * SANITY_PROJECT_ID / SANITY_DATASET (e.g. via Netlify env vars) those win,
 * because `import.meta.env.*` is populated first. These defaults just make
 * `npm run build` succeed on a fresh clone with no `.env` file.
 */
const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID || "jghpyuue";
const SANITY_DATASET = process.env.SANITY_DATASET || "production";

export default defineConfig({
  site: "https://sterna.pt",
  image: {
    responsiveStyles: true,
  },
  devToolbar: {
    enabled: false,
  },
  i18n: {
    defaultLocale: "en",
    locales: ["en", "pt"],
    routing: {
      prefixDefaultLocale: false,
      redirectToDefaultLocale: false,
    },
  },
  vite: {
    define: {
      // Build-time fallbacks — only used if the runtime env doesn't set them.
      "import.meta.env.PUBLIC_SANITY_PROJECT_ID": JSON.stringify(SANITY_PROJECT_ID),
      "import.meta.env.PUBLIC_SANITY_DATASET": JSON.stringify(SANITY_DATASET),
    },
  },
});
