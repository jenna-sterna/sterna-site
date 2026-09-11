import { defineType, defineField } from "sanity";

/**
 * Site-wide contact info + basic company details.
 * Singleton — only one document exists (id: "company").
 */
export default defineType({
  name: "company",
  title: "Contact info",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Company name",
      description: "Full brand name (used in the browser tab, SEO, structured data).",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortName",
      title: "Short name",
      description: "Short version of the brand name (e.g. ‘Sterna’). Used in tight spots.",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "phone",
      title: "Phone (display)",
      description: "How the phone number is displayed to visitors (e.g. ‘+1 650 847 8614’).",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "phoneHref",
      title: "Phone (link)",
      description: "The tel: link (e.g. ‘tel:+16508478614’). Numbers only, no spaces.",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "whatsapp",
      title: "WhatsApp (display)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "whatsappHref",
      title: "WhatsApp link",
      description: "Full URL — e.g. ‘https://wa.me/16508478614’.",
      type: "url",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email (display)",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "emailHref",
      title: "Email link",
      description: "The mailto: link (e.g. ‘mailto:info@sterna.pt’).",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "instagramHandle",
      title: "Instagram handle",
      description: "Include the @ (e.g. ‘@sternaaveirotours’).",
      type: "string",
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
    }),
    defineField({
      name: "tripadvisorUrl",
      title: "TripAdvisor URL",
      description: "Full link to your TripAdvisor listing.",
      type: "url",
    }),
    defineField({
      name: "googleReviewsUrl",
      title: "Google Reviews URL",
      description: "Link to your Google Business reviews. Leave blank to hide the Google reviews link.",
      type: "url",
    }),
    defineField({
      name: "reviewCount",
      title: "Review count (display)",
      description: "Free-text — e.g. ‘300+’. Used in trust copy across the site.",
      type: "string",
    }),
    defineField({
      name: "established",
      title: "Established (year)",
      description: "Year the business started, used in structured data.",
      type: "number",
    }),
    defineField({
      name: "addressCity",
      title: "City",
      type: "string",
    }),
    defineField({
      name: "addressRegion",
      title: "Region",
      description: "Portuguese region (e.g. ‘Centro’).",
      type: "string",
    }),
    defineField({
      name: "addressCountry",
      title: "Country",
      type: "string",
    }),
    defineField({
      name: "maxGroupSize",
      title: "Max group size",
      description: "The number used in copy ‘Small groups (max X)’.",
      type: "number",
    }),
    defineField({
      name: "logo",
      title: "Logo",
      description: "The Sterna wordmark shown in the header (top-left) and preloader. PNG with transparency preferred, ~1200px wide.",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "ogImage",
      title: "Social sharing preview image",
      description: "Shown when the site link is shared on Facebook/WhatsApp/Slack/etc. Landscape 1200×630px works best.",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    prepare: () => ({ title: "Contact info" }),
  },
});
