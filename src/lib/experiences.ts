import { getCollection } from "astro:content";
import type { Lang } from "./i18n";

export type Experience = {
  slug: string;
  order: number;
  featured: boolean;
  category: "food-wine" | "nature-water" | "culture" | "wellness";
  categoryLabel: { en: string; pt: string };
  name: { en: string; pt: string };
  short: { en: string; pt: string };
  oneLiner: { en: string; pt: string };
  duration: { en: string; pt: string };
  included: { en: string[]; pt: string[] };
  addOns?: { en: string[]; pt: string[] };
  priceNote: { en: string; pt: string };
  heroPhoto?: string;
  gallery?: string[];
  press?: {
    source: string;      // e.g. "Travel + Leisure"
    quote: { en: string; pt: string };
    url: string;
  };
};

// Load experiences from the Astro content collection (/src/content/experiences/*.md).
// Every consumer must `await` this — pages can await at the top of their frontmatter.
export async function loadExperiences(): Promise<Experience[]> {
  const entries = await getCollection("experiences");
  return entries
    .map((entry) => {
      const d = entry.data;
      const exp: Experience = {
        slug: d.slug,
        order: d.order,
        featured: d.featured,
        category: d.category,
        categoryLabel: { en: d.categoryLabelEn, pt: d.categoryLabelPt },
        name: { en: d.nameEn, pt: d.namePt },
        short: { en: d.shortEn, pt: d.shortPt },
        oneLiner: { en: d.oneLinerEn, pt: d.oneLinerPt },
        duration: { en: d.durationEn, pt: d.durationPt },
        included: { en: d.includedEn, pt: d.includedPt },
        priceNote: { en: d.priceNoteEn, pt: d.priceNotePt },
        heroPhoto: d.heroPhoto,
        gallery: d.gallery,
      };
      if (d.addOnsEn && d.addOnsPt) {
        exp.addOns = { en: d.addOnsEn, pt: d.addOnsPt };
      }
      if (d.pressSource && d.pressUrl && d.pressQuoteEn && d.pressQuotePt) {
        exp.press = {
          source: d.pressSource,
          url: d.pressUrl,
          quote: { en: d.pressQuoteEn, pt: d.pressQuotePt },
        };
      }
      return exp;
    })
    .sort((a, b) => a.order - b.order);
}

export async function loadFeaturedExperiences(): Promise<Experience[]> {
  const all = await loadExperiences();
  return all.filter((e) => e.featured);
}

export async function loadMoreExperiences(): Promise<Experience[]> {
  const all = await loadExperiences();
  return all.filter((e) => !e.featured);
}

export function localField(
  field: { en: string; pt: string } | { en: string[]; pt: string[] },
  lang: Lang,
): string | string[] {
  return field[lang];
}
