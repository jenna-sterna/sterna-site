import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

/* =========================================================
   Experiences (existing — do not refactor)
   ========================================================= */
const experiences = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/experiences" }),
  schema: z.object({
    slug: z.string(),
    order: z.number(),
    featured: z.boolean(),
    category: z.enum(["food-wine", "nature-water", "culture", "wellness"]),
    categoryLabelEn: z.string(),
    categoryLabelPt: z.string(),
    nameEn: z.string(),
    namePt: z.string(),
    shortEn: z.string(),
    shortPt: z.string(),
    oneLinerEn: z.string(),
    oneLinerPt: z.string(),
    durationEn: z.string(),
    durationPt: z.string(),
    includedEn: z.array(z.string()),
    includedPt: z.array(z.string()),
    addOnsEn: z.array(z.string()).optional(),
    addOnsPt: z.array(z.string()).optional(),
    priceNoteEn: z.string(),
    priceNotePt: z.string(),
    heroPhoto: z.string().optional(),
    gallery: z.array(z.string()).optional(),
    pressSource: z.string().optional(),
    pressUrl: z.string().url().optional(),
    pressQuoteEn: z.string().optional(),
    pressQuotePt: z.string().optional(),
  }),
});

/* =========================================================
   Founders (one .md per founder)
   ========================================================= */
const founders = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/founders" }),
  schema: z.object({
    order: z.number(),
    slug: z.string(),
    nameEn: z.string(),
    namePt: z.string(),
    roleEn: z.string(),
    rolePt: z.string(),
    originEn: z.string(),
    originPt: z.string(),
    lineEn: z.string(),
    linePt: z.string(),
    photo: z.string().optional(),
  }),
});

/* =========================================================
   FAQs (one .md per question)
   ========================================================= */
const faqs = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/faqs" }),
  schema: z.object({
    order: z.number(),
    questionEn: z.string(),
    questionPt: z.string(),
    answerEn: z.string(),
    answerPt: z.string(),
  }),
});

/* =========================================================
   Reviews (real TripAdvisor / Google reviews)
   ========================================================= */
const reviews = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/reviews" }),
  schema: z.object({
    order: z.number(),
    authorName: z.string(),
    authorMeta: z.string(),
    rating: z.number().min(1).max(5),
    quoteEn: z.string(),
    quotePt: z.string(),
  }),
});

/* =========================================================
   Settings (site-wide .yml — company info, trust badges)
   Loaded via a glob of every .yml file in the folder.
   Each file becomes one entry (id = filename without ext).
   ========================================================= */
const settings = defineCollection({
  loader: glob({ pattern: "**/*.yml", base: "./src/content/settings" }),
  schema: z
    .object({
      // company.yml fields
      name: z.string().optional(),
      shortName: z.string().optional(),
      phone: z.string().optional(),
      phoneHref: z.string().optional(),
      whatsapp: z.string().optional(),
      whatsappHref: z.string().optional(),
      email: z.string().optional(),
      emailHref: z.string().optional(),
      instagramHandle: z.string().optional(),
      instagramUrl: z.string().optional(),
      tripadvisorUrl: z.string().optional(),
      reviewCount: z.string().optional(),
      established: z.number().optional(),
      addressCity: z.string().optional(),
      addressRegion: z.string().optional(),
      addressCountry: z.string().optional(),
      maxGroupSize: z.number().optional(),
      // trust.yml fields
      badges: z
        .array(
          z.object({
            en: z.string(),
            pt: z.string(),
          }),
        )
        .optional(),
    })
    .passthrough(),
});

/* =========================================================
   Pages (per-page copy, EN/PT variants).
   Schema is a permissive record because each page has its
   own unique keys; components access the fields they need.
   ========================================================= */
const pages = defineCollection({
  loader: glob({ pattern: "**/*.yml", base: "./src/content/pages" }),
  schema: z.record(z.string(), z.any()),
});

export const collections = {
  experiences,
  founders,
  faqs,
  reviews,
  settings,
  pages,
};
