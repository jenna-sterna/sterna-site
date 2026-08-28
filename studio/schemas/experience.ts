import { defineType, defineField, defineArrayMember } from "sanity";

/**
 * A single Sterna experience (e.g. "Salt pans + Portuguese lunch").
 * Editors: use one document per experience.
 */
export default defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    defineField({
      name: "slug",
      title: "URL slug",
      description: "The URL segment. Must match the current file name (e.g. salt-pans-lunch). Do not change unless you understand the SEO consequences.",
      type: "slug",
      options: { source: "nameEn", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Order",
      description: "Lower numbers appear first. 1 = first.",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "featured",
      title: "Featured?",
      description: "Featured experiences show in the ‘Six core experiences’ section on the Experiences page. Others appear under ‘Also worth doing’.",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "category",
      title: "Category",
      description: "Broad grouping. Choose the closest match.",
      type: "string",
      options: {
        list: [
          { title: "Food & Wine", value: "food-wine" },
          { title: "Nature & Water", value: "nature-water" },
          { title: "Culture", value: "culture" },
          { title: "Wellness", value: "wellness" },
        ],
        layout: "radio",
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "categoryLabelEn",
      title: "Category label (English)",
      description: "Free-text label shown on cards. E.g. ‘Food & Wine’ or ‘Nature & Water’.",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "categoryLabelPt",
      title: "Category label (Portuguese)",
      description: "Portuguese version of the category label. E.g. ‘Comida & Vinho’.",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "nameEn",
      title: "Name (English)",
      description: "Full title of the experience.",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "namePt",
      title: "Name (Portuguese)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortEn",
      title: "Short summary (English)",
      description: "One line shown on cards and lists. Aim for ~5–8 words.",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortPt",
      title: "Short summary (Portuguese)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "oneLinerEn",
      title: "One-liner (English)",
      description: "The teaser sentence that runs under the title on the detail page and card.",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "oneLinerPt",
      title: "One-liner (Portuguese)",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "durationEn",
      title: "Duration (English)",
      description: "How long the experience takes. Free text (e.g. ‘4 hours’, ‘Half or full day’).",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "durationPt",
      title: "Duration (Portuguese)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "includedEn",
      title: "What’s included (English)",
      description: "Bullet points shown in the ‘What’s included’ list on the detail page. One item per line.",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "includedPt",
      title: "What’s included (Portuguese)",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "addOnsEn",
      title: "Optional add-ons (English)",
      description: "Optional extras shown in a second list. Leave empty if there are none.",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "addOnsPt",
      title: "Optional add-ons (Portuguese)",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "priceNoteEn",
      title: "Price note (English)",
      description: "Short paragraph explaining how pricing works (e.g. ‘Varies by group size…’).",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "priceNotePt",
      title: "Price note (Portuguese)",
      type: "text",
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "pressSource",
      title: "Press source (optional)",
      description: "If featured in press (e.g. ‘Travel + Leisure’). Leave blank if not.",
      type: "string",
    }),
    defineField({
      name: "pressUrl",
      title: "Press article URL (optional)",
      description: "Direct link to the press article.",
      type: "url",
    }),
    defineField({
      name: "pressQuoteEn",
      title: "Press quote (English, optional)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "pressQuotePt",
      title: "Press quote (Portuguese, optional)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "heroPhoto",
      title: "Hero photo",
      description: "Large image at the top of the experience page and on cards. Upload a landscape photo, min 1600px wide for best quality.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "gallery",
      title: "Gallery photos",
      description: "Photos shown in the gallery at the bottom of the experience page. Add 4–8 images for best layout.",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
        }),
      ],
    }),
  ],
  orderings: [
    {
      title: "Order (manual)",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "nameEn",
      subtitle: "shortEn",
      media: "heroPhoto",
      order: "order",
      featured: "featured",
    },
    prepare({ title, subtitle, media, order, featured }) {
      return {
        title: `${String(order ?? "?").padStart(2, "0")}. ${title ?? "(untitled)"}${featured ? "  ★" : ""}`,
        subtitle,
        media,
      };
    },
  },
});
