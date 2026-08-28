import { defineType } from "sanity";
import { pairs } from "./_helpers";

export default defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  fieldsets: [
    { name: "brand",  title: "1. Brand column",    options: { collapsible: true, collapsed: false } },
    { name: "cols",   title: "2. Column headings", options: { collapsible: true, collapsed: true } },
    { name: "bottom", title: "3. Copyright row",   options: { collapsible: true, collapsed: true } },
  ],
  fields: pairs([
    { fieldset: "brand", name: "tagline", title: "Tagline under brand", type: "text", rows: 2 },
    { fieldset: "brand", name: "chip1",   title: "Trust chip 1" },
    { fieldset: "brand", name: "chip2",   title: "Trust chip 2" },
    { fieldset: "brand", name: "chip3",   title: "Trust chip 3" },

    { fieldset: "cols", name: "colExplore",     title: "‘Explore’ column heading" },
    { fieldset: "cols", name: "colExperiences", title: "‘Experiences’ column heading" },
    { fieldset: "cols", name: "colContact",     title: "‘Contact’ column heading" },

    { fieldset: "bottom", name: "rightsPrefix",         title: "Rights line prefix (usually ‘©’)" },
    { fieldset: "bottom", name: "rightsSuffix",         title: "Rights line suffix" },
    { fieldset: "bottom", name: "obrigado",             title: "Handwritten ‘Obrigado’ line" },
    { fieldset: "bottom", name: "tripadvisorLinkText",  title: "TripAdvisor link text" },
  ]),
  preview: { prepare: () => ({ title: "Footer" }) },
});
