import { defineType } from "sanity";
import { pairs } from "./_helpers";

export default defineType({
  name: "experiencesIndexPage",
  title: "Experiences page (intro copy)",
  type: "document",
  fieldsets: [
    { name: "hero",   title: "1. Page hero",           options: { collapsible: true, collapsed: false } },
    { name: "core",   title: "2. Core experiences label", options: { collapsible: true, collapsed: true } },
    { name: "more",   title: "3. ‘Also worth doing’ label", options: { collapsible: true, collapsed: true } },
    { name: "custom", title: "4. Custom experience band",  options: { collapsible: true, collapsed: true } },
  ],
  fields: pairs([
    { fieldset: "hero", name: "eyebrow", title: "Page eyebrow" },
    { fieldset: "hero", name: "h1Line1", title: "Headline — line 1" },
    { fieldset: "hero", name: "h1Line2", title: "Headline — line 2 (italic)" },
    { fieldset: "hero", name: "lead",    title: "Lead paragraph", type: "text", rows: 4 },

    { fieldset: "core", name: "coreEyebrow", title: "Core section eyebrow" },
    { fieldset: "core", name: "coreH2",      title: "Core section headline" },

    { fieldset: "more", name: "moreEyebrow", title: "More section eyebrow" },
    { fieldset: "more", name: "moreH2",      title: "More section headline" },
    { fieldset: "more", name: "moreLead",    title: "More section lead", type: "text", rows: 3 },

    { fieldset: "custom", name: "customEyebrow", title: "Custom band eyebrow" },
    { fieldset: "custom", name: "customH2",      title: "Custom band headline", type: "text", rows: 2 },
    { fieldset: "custom", name: "customLead",    title: "Custom band paragraph", type: "text", rows: 3 },
  ]),
  preview: { prepare: () => ({ title: "Experiences page" }) },
});
