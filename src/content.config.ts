import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

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

export const collections = { experiences };
