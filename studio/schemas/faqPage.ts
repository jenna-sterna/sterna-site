import { defineType } from "sanity";
import { pairs } from "./_helpers";

export default defineType({
  name: "faqPage",
  title: "FAQ page (intro copy)",
  type: "document",
  fieldsets: [
    { name: "hero", title: "Page hero",        options: { collapsible: true, collapsed: false } },
    { name: "cta",  title: "Bottom CTA",       options: { collapsible: true, collapsed: false } },
  ],
  fields: pairs([
    { fieldset: "hero", name: "eyebrow", title: "Page eyebrow" },
    { fieldset: "hero", name: "h1Line1", title: "Headline — line 1" },
    { fieldset: "hero", name: "h1Line2", title: "Headline — line 2 (italic)" },
    { fieldset: "hero", name: "lead",    title: "Lead paragraph", type: "text", rows: 3 },

    { fieldset: "cta", name: "stillCurious", title: "‘Still curious?’ line" },
    { fieldset: "cta", name: "whatsappCta",  title: "WhatsApp button label" },
    { fieldset: "cta", name: "emailCta",     title: "Email button label" },
  ]),
  preview: { prepare: () => ({ title: "FAQ page" }) },
});
