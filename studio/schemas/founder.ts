import { defineType, defineField } from "sanity";

export default defineType({
  name: "founder",
  title: "Founder",
  type: "document",
  fields: [
    defineField({
      name: "order",
      title: "Order",
      description: "Lower numbers appear first (left to right).",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      description: "Lowercase identifier (e.g. jenna, carlos, sandra).",
      type: "slug",
      options: { source: "nameEn", maxLength: 40 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "nameEn",
      title: "Name (English)",
      description: "First name is fine (e.g. ‘Sandra’).",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "namePt",
      title: "Name (Portuguese)",
      description: "Usually identical to the English name.",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "roleEn",
      title: "Role (English)",
      description: "E.g. ‘Concierge & Guide’, ‘Master Guide, 300+ ⭐⭐⭐⭐⭐’.",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "rolePt",
      title: "Role (Portuguese)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "originEn",
      title: "Origin (English)",
      description: "One line shown below the role (e.g. ‘USA → Aveiro, 2025’).",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "originPt",
      title: "Origin (Portuguese)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "lineEn",
      title: "Bio line (English)",
      description: "Short paragraph on the About page card.",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "linePt",
      title: "Bio line (Portuguese)",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "photo",
      title: "Photo",
      description: "Portrait photo. Vertical orientation works best (4:5).",
      type: "image",
      options: { hotspot: true },
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
      title: "nameEn",
      subtitle: "roleEn",
      media: "photo",
      order: "order",
    },
    prepare({ title, subtitle, media, order }) {
      return {
        title: `${order ?? "?"}. ${title ?? "(untitled)"}`,
        subtitle,
        media,
      };
    },
  },
});
