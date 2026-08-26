export type Lang = "en" | "pt";
export const locales: Lang[] = ["en", "pt"];

export function getLangFromUrl(url: URL): Lang {
  return url.pathname.startsWith("/pt/") || url.pathname === "/pt"
    ? "pt"
    : "en";
}

export function localizedPath(path: string, lang: Lang): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (lang === "en") return clean;
  if (clean === "/") return "/pt/";
  return `/pt${clean}`;
}

// Given the current URL, produce the URL for the same page in the other lang
export function swapLangUrl(currentPath: string, targetLang: Lang): string {
  const withoutPt = currentPath.replace(/^\/pt(\/|$)/, "/");
  const clean = withoutPt.endsWith("/") ? withoutPt : withoutPt + "/";
  return localizedPath(clean, targetLang);
}
