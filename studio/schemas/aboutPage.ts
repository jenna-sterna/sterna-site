import { defineField, defineType } from "sanity";
import { pairs } from "./_helpers";

export default defineType({
  name: "aboutPage",
  title: "About page",
  type: "document",
  fieldsets: [
    { name: "hero",  title: "1. Page hero",    options: { collapsible: true, collapsed: false } },
    { name: "story", title: "2. Story",        options: { collapsible: true, collapsed: true } },
    { name: "meet",  title: "3. Meet the team",options: { collapsible: true, collapsed: true } },
    { name: "why",   title: "4. Why Aveiro",   options: { collapsible: true, collapsed: true } },
    { name: "photos",title: "5. Photos (swap either about-page image)", options: { collapsible: true, collapsed: true } },
  ],
  fields: [
    ...pairs([
    { fieldset: "hero", name: "eyebrow", title: "Page eyebrow" },
    { fieldset: "hero", name: "h1Line1", title: "Headline — line 1" },
    { fieldset: "hero", name: "h1Line2", title: "Headline — line 2 (italic)" },
    { fieldset: "hero", name: "lead",    title: "Lead paragraph", type: "text", rows: 4 },

    { fieldset: "story", name: "storyH2",     title: "Story section label" },
    { fieldset: "story", name: "storyPara1",  title: "Story paragraph 1", type: "text", rows: 5 },
    { fieldset: "story", name: "storyPara2",  title: "Story paragraph 2", type: "text", rows: 5 },
    { fieldset: "story", name: "storyPara3",  title: "Story paragraph 3", type: "text", rows: 5 },
    { fieldset: "story", name: "storyPara4",  title: "Story paragraph 4", type: "text", rows: 4 },
    { fieldset: "story", name: "storySig",    title: "Signature line" },

    { fieldset: "meet", name: "meetH2", title: "Meet-the-team section label" },

    { fieldset: "why", name: "whyEyebrow",  title: "Why-Aveiro eyebrow" },
    { fieldset: "why", name: "whyH2Line1",  title: "Why-Aveiro headline — line 1" },
    { fieldset: "why", name: "whyH2Line2",  title: "Why-Aveiro headline — line 2 (italic)" },
    { fieldset: "why", name: "whyLead",     title: "Why-Aveiro lead paragraph", type: "text", rows: 3 },
    { fieldset: "why", name: "whyBody",     title: "Why-Aveiro body paragraph", type: "text", rows: 4 },
    ]),

    // Photos — editable image slots. All optional. Site falls back to the
    // existing hardcoded photos if empty, so nothing visually breaks.
    defineField({
      name: "storyImage",
      title: "Story photo (‘How we met’ section)",
      description:
        "The Bussaco Palace photo shown next to the ‘How we met’ story paragraphs. Portrait / 4×5 works best.",
      type: "image",
      options: { hotspot: true },
      fieldset: "photos",
    }),
    defineField({
      name: "whyImage",
      title: "Why-Aveiro photo (boat / sunset)",
      description:
        "The photo in the ‘Why Aveiro’ section at the bottom — usually a boat or Ria sunset shot. Portrait / 4×5 works best.",
      type: "image",
      options: { hotspot: true },
      fieldset: "photos",
    }),
  ],
  preview: { prepare: () => ({ title: "About page" }) },
});
