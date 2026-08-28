import { defineType, defineField, defineArrayMember } from "sanity";

/**
 * List of small trust badges shown around the site.
 * Singleton — only one document (id: "trust").
 */
export default defineType({
  name: "trust",
  title: "Trust badges",
  type: "document",
  fields: [
    defineField({
      name: "badges",
      title: "Badges",
      description: "Short trust markers (e.g. ‘Licensed & insured’, ‘300+ five-star reviews’). Each has an English and a Portuguese version.",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          name: "badge",
          fields: [
            defineField({
              name: "en",
              title: "English",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "pt",
              title: "Portuguese",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: { title: "en", subtitle: "pt" },
          },
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Trust badges" }),
  },
});
