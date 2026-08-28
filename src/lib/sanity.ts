/**
 * Sanity data layer for the Astro site.
 *
 * Replaces the old `siteData.ts` (which read markdown/YAML files from
 * `src/content/`). Everything now comes from the Sanity Content Lake.
 *
 * Environment variables (see `.env.example`):
 *   SANITY_PROJECT_ID   – Sanity project ID. Falls back to "jghpyuue".
 *   SANITY_DATASET      – Dataset name. Falls back to "production".
 *   SANITY_READ_TOKEN   – (Optional) Read token for previewing drafts.
 *   PUBLIC_SANITY_PROJECT_ID / PUBLIC_SANITY_DATASET are also honoured
 *   so build-time env vars work in Netlify without prefix issues.
 *
 * All exported functions preserve the signatures of the old `siteData.ts`,
 * so consumer components only need to swap the import path.
 */

import { createClient, type SanityClient } from "@sanity/client";
import { createImageUrlBuilder } from "@sanity/image-url";
import type { Lang } from "./i18n";

const PROJECT_ID =
  import.meta.env.SANITY_PROJECT_ID ||
  import.meta.env.PUBLIC_SANITY_PROJECT_ID ||
  "jghpyuue";
const DATASET =
  import.meta.env.SANITY_DATASET ||
  import.meta.env.PUBLIC_SANITY_DATASET ||
  "production";
const READ_TOKEN = import.meta.env.SANITY_READ_TOKEN || undefined;

export const sanityClient: SanityClient = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: "2024-01-01",
  useCdn: !READ_TOKEN, // use CDN unless we're previewing drafts
  perspective: READ_TOKEN ? "previewDrafts" : "published",
  token: READ_TOKEN,
});

const builder = createImageUrlBuilder(sanityClient);

/**
 * Convert a Sanity image reference or asset URL to a plain URL string.
 * Accepts:
 *   - a raw string (e.g. "/uploads/foo.jpg" — falls through unchanged)
 *   - a Sanity image object with `asset._ref` or `asset.url`
 */
export function urlFor(source: any): string | undefined {
  if (!source) return undefined;
  if (typeof source === "string") return source;
  if (source.asset?.url) return source.asset.url;
  try {
    return builder.image(source).auto("format").fit("max").url();
  } catch {
    return undefined;
  }
}

/**
 * Convert a Sanity image field (from a page document) to a plain URL string,
 * or `undefined` if the field is empty. This is what page components use when
 * they want to fall back to a hardcoded local photo:
 *
 *   const heroImage = imageUrl(home.heroImage) ?? "/uploads/hero/default.jpg";
 *
 * Accepts the same shapes as `urlFor` (raw string, Sanity image object with
 * either `asset._ref` or `asset.url`, or `undefined`). Returns `undefined`
 * when the field is missing so the fallback expression works cleanly.
 */
export function imageUrl(source: any): string | undefined {
  if (!source) return undefined;
  if (typeof source === "string") return source || undefined;
  // Sanity image objects always have an `asset` sub-object once uploaded.
  if (!source.asset) return undefined;
  if (source.asset.url) return source.asset.url;
  try {
    return builder.image(source).auto("format").fit("max").url();
  } catch {
    return undefined;
  }
}

/**
 * Safely run a GROQ query. Returns `fallback` if the query fails
 * (e.g. project is unreachable during build). Logs the error so we can
 * see it in the Netlify build log without breaking the build.
 */
async function safeFetch<T>(query: string, params: Record<string, any>, fallback: T): Promise<T> {
  try {
    const data = await sanityClient.fetch<T>(query, params);
    return (data ?? fallback) as T;
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn(`[sanity] Query failed, using fallback. Reason:`, (err as Error).message);
    return fallback;
  }
}

/* =========================================================
   Company info (singleton: _type == "company")
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

const COMPANY_FALLBACK: CompanyInfo = {
  name: "Sterna Aveiro Experiences",
  shortName: "Sterna",
  phone: "",
  phoneHref: "",
  whatsapp: "",
  whatsappHref: "",
  email: "",
  emailHref: "",
  instagramHandle: "",
  instagramUrl: "",
  tripadvisorUrl: "",
  reviewCount: "",
  established: new Date().getFullYear(),
  address: { city: "Aveiro", region: "Centro", country: "Portugal" },
  maxGroupSize: 8,
};

export async function getCompany(): Promise<CompanyInfo> {
  const raw = await safeFetch<any>(
    `*[_type == "company"][0]{
      name, shortName, phone, phoneHref, whatsapp, whatsappHref,
      email, emailHref, instagramHandle, instagramUrl, tripadvisorUrl,
      reviewCount, established, addressCity, addressRegion, addressCountry,
      maxGroupSize
    }`,
    {},
    null,
  );
  if (!raw) return COMPANY_FALLBACK;
  return {
    name: raw.name || COMPANY_FALLBACK.name,
    shortName: raw.shortName || COMPANY_FALLBACK.shortName,
    phone: raw.phone || "",
    phoneHref: raw.phoneHref || "",
    whatsapp: raw.whatsapp || "",
    whatsappHref: raw.whatsappHref || "",
    email: raw.email || "",
    emailHref: raw.emailHref || "",
    instagramHandle: raw.instagramHandle || "",
    instagramUrl: raw.instagramUrl || "",
    tripadvisorUrl: raw.tripadvisorUrl || "",
    reviewCount: raw.reviewCount || "",
    established: raw.established || COMPANY_FALLBACK.established,
    address: {
      city: raw.addressCity || COMPANY_FALLBACK.address.city,
      region: raw.addressRegion || COMPANY_FALLBACK.address.region,
      country: raw.addressCountry || COMPANY_FALLBACK.address.country,
    },
    maxGroupSize: raw.maxGroupSize || COMPANY_FALLBACK.maxGroupSize,
  };
}

/* =========================================================
   Trust badges (singleton: _type == "trust")
   ========================================================= */
export type TrustBadge = { en: string; pt: string };

export async function getTrustBadges(): Promise<TrustBadge[]> {
  const raw = await safeFetch<{ badges?: TrustBadge[] } | null>(
    `*[_type == "trust"][0]{ badges }`,
    {},
    null,
  );
  return raw?.badges || [];
}

/* =========================================================
   Founders (sorted by `order`)
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
  const raw = await safeFetch<any[]>(
    `*[_type == "founder"] | order(order asc){
      "slug": slug.current,
      nameEn, namePt, roleEn, rolePt, originEn, originPt, lineEn, linePt,
      "photo": photo.asset->url
    }`,
    {},
    [],
  );
  return raw.map((d) => ({
    slug: d.slug,
    name: d.nameEn,
    role: { en: d.roleEn, pt: d.rolePt },
    origin: { en: d.originEn, pt: d.originPt },
    line: { en: d.lineEn, pt: d.linePt },
    photo: d.photo || undefined,
  }));
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
  const raw = await safeFetch<FaqItem[]>(
    `*[_type == "faq"] | order(order asc){
      questionEn, questionPt, answerEn, answerPt
    }`,
    {},
    [],
  );
  return raw;
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
  const raw = await safeFetch<ReviewItem[]>(
    `*[_type == "review"] | order(order asc){
      authorName, authorMeta, rating, quoteEn, quotePt
    }`,
    {},
    [],
  );
  return raw;
}

/* =========================================================
   Generic page loader.
   Every page is a singleton document whose _type matches
   the mapping below. The document holds flat fields with
   `_en` / `_pt` suffixes so pick(page, "hero_lead", lang)
   still works.
   ========================================================= */
const PAGE_TYPE: Record<string, string> = {
  home: "homePage",
  about: "aboutPage",
  faq: "faqPage",
  contact: "contactPage",
  "experiences-index": "experiencesIndexPage",
  "experience-detail": "experienceDetailPage",
  meta: "siteMeta",
  nav: "nav",
  footer: "footer",
};

export async function getPage(id: string): Promise<Record<string, any>> {
  const type = PAGE_TYPE[id] || id;
  const raw = await safeFetch<Record<string, any> | null>(
    `*[_type == $type][0]`,
    { type },
    null,
  );
  return raw || {};
}

export function pick(
  page: Record<string, any>,
  key: string,
  lang: Lang,
): string {
  const val = page[`${key}_${lang}`];
  return val == null ? "" : String(val);
}
