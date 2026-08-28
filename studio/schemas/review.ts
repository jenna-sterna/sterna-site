import { defineType, defineField } from "sanity";

export default defineType({
  name: "review",
  title: "Review",
  type: "document",
  fields: [
    defineField({
      name: "order",
      title: "Order",
      description: "Lower numbers appear first. First 6 appear on the homepage.",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "authorName",
      title: "Author name",
      description: "As it appears on TripAdvisor / Google.",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "authorMeta",
      title: "Author meta",
      description: "Extra context — usually the date and/or location (e.g. ‘London, UK · August 2025’).",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "rating",
      title: "Rating (1–5 stars)",
      type: "number",
      initialValue: 5,
      validation: (Rule) => Rule.required().min(1).max(5).integer(),
    }),
    defineField({
      name: "quoteEn",
      title: "Quote (English)",
      description: "The verbatim review text.",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "quotePt",
      title: "Quote (Portuguese)",
      description: "Usually left identical to the English quote (reviews are quoted verbatim).",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
  ],
  orderings: [
    {
      title: "Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "authorName",
      subtitle: "quoteEn",
      order: "order",
      rating: "rating",
    },
    prepare({ title, subtitle, order, rating }) {
      const stars = "★".repeat(rating ?? 0);
      return {
        title: `${String(order ?? "?").padStart(2, "0")}. ${title ?? "(anon)"}  ${stars}`,
        subtitle,
      };
    },
  },
});
