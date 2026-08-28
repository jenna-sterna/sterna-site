import { defineType } from "sanity";
import { pairs } from "./_helpers";

export default defineType({
  name: "experienceDetailPage",
  title: "Experience detail (shared labels)",
  type: "document",
  fieldsets: [
    { name: "nav",     title: "1. Navigation labels",       options: { collapsible: true, collapsed: false } },
    { name: "side",    title: "2. Side info block labels",  options: { collapsible: true, collapsed: true } },
    { name: "content", title: "3. Content block labels",    options: { collapsible: true, collapsed: true } },
    { name: "note",    title: "4. ‘Note from us’ block",    options: { collapsible: true, collapsed: true } },
    { name: "gallery", title: "5. Gallery section",          options: { collapsible: true, collapsed: true } },
    { name: "related", title: "6. Related section",          options: { collapsible: true, collapsed: true } },
  ],
  fields: pairs([
    { fieldset: "nav", name: "backLink", title: "Back link text" },

    { fieldset: "side", name: "sideDuration",      title: "‘How long’ label" },
    { fieldset: "side", name: "sideGroup",         title: "‘Group size’ label" },
    { fieldset: "side", name: "sideGroupText",     title: "‘Group size’ body text", type: "text", rows: 2 },
    { fieldset: "side", name: "sideLanguages",     title: "‘Languages’ label" },
    { fieldset: "side", name: "sideLanguagesText", title: "‘Languages’ body text" },
    { fieldset: "side", name: "sidePrice",         title: "‘Price’ label" },
    { fieldset: "side", name: "ctaQuote",          title: "‘WhatsApp for a quote’ label" },
    { fieldset: "side", name: "ctaEmail",          title: "‘Email us’ label" },

    { fieldset: "content", name: "included",  title: "‘What’s included’ heading" },
    { fieldset: "content", name: "addOns",    title: "‘Optional add-ons’ heading" },

    { fieldset: "note", name: "noteHand",  title: "Note — small handwritten label" },
    { fieldset: "note", name: "noteBody",  title: "Note — body paragraph", type: "text", rows: 4 },
    { fieldset: "note", name: "noteSig",   title: "Note — signature" },

    { fieldset: "gallery", name: "galleryEyebrow", title: "Gallery eyebrow" },
    { fieldset: "gallery", name: "galleryH2",      title: "Gallery headline" },

    { fieldset: "related", name: "relatedEyebrow", title: "Related eyebrow" },
    { fieldset: "related", name: "relatedH2",      title: "Related headline" },
  ]),
  preview: { prepare: () => ({ title: "Experience detail (shared labels)" }) },
});
