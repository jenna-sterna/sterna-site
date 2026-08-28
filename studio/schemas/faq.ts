import { defineType, defineField } from "sanity";

export default defineType({
  name: "faq",
  title: "FAQ",
  type: "document",
  fields: [
    defineField({
      name: "order",
      title: "Order",
      description: "Lower numbers appear first.",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "questionEn",
      title: "Question (English)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "questionPt",
      title: "Question (Portuguese)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "answerEn",
      title: "Answer (English)",
      description: "The answer shown when the question is expanded.",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "answerPt",
      title: "Answer (Portuguese)",
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
      title: "questionEn",
      subtitle: "answerEn",
      order: "order",
    },
    prepare({ title, subtitle, order }) {
      return {
        title: `${String(order ?? "?").padStart(2, "0")}. ${title ?? "(untitled)"}`,
        subtitle,
      };
    },
  },
});
