import type { Lang } from "./i18n";

/* =========================================================
   Structural navigation. URLs stay hardcoded — they define
   the site's route shape, which is code, not editorial.
   ========================================================= */
type NavLink = { key: string; hrefEn: string; hrefPt: string };
export const navKeys: NavLink[] = [
  { key: "home", hrefEn: "/", hrefPt: "/pt/" },
  { key: "experiences", hrefEn: "/experiences/", hrefPt: "/pt/experiences/" },
  { key: "about", hrefEn: "/about/", hrefPt: "/pt/about/" },
  { key: "faq", hrefEn: "/faq/", hrefPt: "/pt/faq/" },
  { key: "contact", hrefEn: "/contact/", hrefPt: "/pt/contact/" },
];

export function href(link: NavLink, lang: Lang): string {
  return lang === "pt" ? link.hrefPt : link.hrefEn;
}

export function path(seg: string, lang: Lang): string {
  const clean = seg.startsWith("/") ? seg : `/${seg}`;
  if (lang === "en") return clean;
  if (clean === "/") return "/pt/";
  return `/pt${clean}`;
}
