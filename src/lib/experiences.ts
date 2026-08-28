/**
 * Experiences data layer.
 *
 * Fetches from Sanity (was previously astro:content getCollection).
 * Every field name and the returned Experience shape is preserved so all
 * consumer components keep working without changes.
 */

import { sanityClient, urlFor } from "./sanity";
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
    source: string;
    quote: { en: string; pt: string };
    url: string;
  };
};

const EXPERIENCES_QUERY = `*[_type == "experience"] | order(order asc){
  "slug": slug.current,
  order, featured, category,
  categoryLabelEn, categoryLabelPt,
  nameEn, namePt, shortEn, shortPt,
  oneLinerEn, oneLinerPt,
  durationEn, durationPt,
  includedEn, includedPt,
  addOnsEn, addOnsPt,
  priceNoteEn, priceNotePt,
  pressSource, pressUrl, pressQuoteEn, pressQuotePt,
  "heroPhoto": heroPhoto.asset->url,
  "gallery": gallery[].asset->url
}`;

function toExperience(d: any): Experience {
  const exp: Experience = {
    slug: d.slug,
    order: d.order,
    featured: !!d.featured,
    category: d.category,
    categoryLabel: { en: d.categoryLabelEn, pt: d.categoryLabelPt },
    name: { en: d.nameEn, pt: d.namePt },
    short: { en: d.shortEn, pt: d.shortPt },
    oneLiner: { en: d.oneLinerEn, pt: d.oneLinerPt },
    duration: { en: d.durationEn, pt: d.durationPt },
    included: { en: d.includedEn || [], pt: d.includedPt || [] },
    priceNote: { en: d.priceNoteEn, pt: d.priceNotePt },
    heroPhoto: d.heroPhoto || undefined,
    gallery: Array.isArray(d.gallery) ? d.gallery.filter(Boolean) : undefined,
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
}

export async function loadExperiences(): Promise<Experience[]> {
  try {
    const raw = await sanityClient.fetch<any[]>(EXPERIENCES_QUERY);
    return (raw || []).map(toExperience);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn("[sanity] Failed to load experiences, returning empty list:", (err as Error).message);
    return [];
  }
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

// Re-export for convenience in case a page wants to construct image URLs
export { urlFor };
