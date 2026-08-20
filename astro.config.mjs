// @ts-check
import { defineConfig } from "astro/config";

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
});
