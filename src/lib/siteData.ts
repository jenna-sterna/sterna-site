import { getCollection, getEntry } from "astro:content";
import type { Lang } from "./i18n";

/* =========================================================
   Company info (from src/content/settings/company.yml)
   Shape mirrors what used to be exported from data.ts.
   ========================================================= */
export type CompanyInfo = {
  name: string;
  shortName: string;
  phone: string;
  phoneHref: string;
  whatsapp: string;
  whatsappHref: string;
  email: string;
  emailHref: string;
  instagramHandle: string;
  instagramUrl: string;
  tripadvisorUrl: string;
  reviewCount: string;
  established: number;
  address: { city: string; region: string; country: string };
  maxGroupSize: number;
};

export async function getCompany(): Promise<CompanyInfo> {
  const entry = await getEntry("settings", "company");
  if (!entry) throw new Error("Missing content/settings/company.yml");
  const d = entry.data as Record<string, any>;
  return {
    name: d.name,
    shortName: d.shortName,
    phone: d.phone,
    phoneHref: d.phoneHref,
    whatsapp: d.whatsapp,
    whatsappHref: d.whatsappHref,
    email: d.email,
    emailHref: d.emailHref,
    instagramHandle: d.instagramHandle,
    instagramUrl: d.instagramUrl,
    tripadvisorUrl: d.tripadvisorUrl,
    reviewCount: d.reviewCount,
    established: d.established,
    address: {
      city: d.addressCity,
      region: d.addressRegion,
      country: d.addressCountry,
    },
    maxGroupSize: d.maxGroupSize,
  };
}

/* =========================================================
   Trust badges
   ========================================================= */
export type TrustBadge = { en: string; pt: string };

export async function getTrustBadges(): Promise<TrustBadge[]> {
  const entry = await getEntry("settings", "trust");
  if (!entry) return [];
  const d = entry.data as { badges?: TrustBadge[] };
  return d.badges || [];
}

/* =========================================================
   Founders (sorted by order)
   ========================================================= */
export type Founder = {
  slug: string;
  name: string;
  role: { en: string; pt: string };
  origin: { en: string; pt: string };
  line: { en: string; pt: string };
  photo?: string;
};

export async function getFounders(): Promise<Founder[]> {
  const entries = await getCollection("founders");
  return entries
    .map((e) => {
      const d = e.data;
      return {
        slug: d.slug,
        // "name" isn't localised in the original data — same in EN and PT.
        name: d.nameEn,
        role: { en: d.roleEn, pt: d.rolePt },
        origin: { en: d.originEn, pt: d.originPt },
        line: { en: d.lineEn, pt: d.linePt },
        photo: d.photo,
        _order: d.order,
      };
    })
    .sort((a, b) => a._order - b._order)
    .map(({ _order, ...rest }) => rest);
}

/* =========================================================
   FAQs
   ========================================================= */
export type FaqItem = {
  questionEn: string;
  questionPt: string;
  answerEn: string;
  answerPt: string;
};

export async function getFaqs(): Promise<FaqItem[]> {
  const entries = await getCollection("faqs");
  return entries
    .map((e) => ({ ...e.data }))
    .sort((a, b) => a.order - b.order)
    .map(({ order, ...rest }) => rest);
}

/* =========================================================
   Reviews
   ========================================================= */
export type ReviewItem = {
  authorName: string;
  authorMeta: string;
  rating: number;
  quoteEn: string;
  quotePt: string;
};

export async function getReviews(): Promise<ReviewItem[]> {
  const entries = await getCollection("reviews");
  return entries
    .map((e) => ({ ...e.data }))
    .sort((a, b) => a.order - b.order)
    .map(({ order, ...rest }) => rest);
}

/* =========================================================
   Generic page loader.
   Each page .yml uses fieldName_en / fieldName_pt suffixes.
   `pick(page, "hero_lead", lang)` returns page[`hero_lead_${lang}`].
   ========================================================= */
export async function getPage(id: string): Promise<Record<string, any>> {
  const entry = await getEntry("pages", id);
  if (!entry) throw new Error(`Missing content/pages/${id}.yml`);
  return entry.data as Record<string, any>;
}

export function pick(
  page: Record<string, any>,
  key: string,
  lang: Lang,
): string {
  const val = page[`${key}_${lang}`];
  return val == null ? "" : String(val);
}
