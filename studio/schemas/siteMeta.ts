import { defineType } from "sanity";
import { pairs } from "./_helpers";

export default defineType({
  name: "siteMeta",
  title: "Site meta",
  type: "document",
  fields: pairs([
    { name: "titleSuffix",        title: "Title suffix", description: "Appended to every browser tab title (e.g. ‘Sterna Aveiro Experiences’)." },
    { name: "defaultTitle",       title: "Default title", description: "Used on the homepage and as a fallback." },
    { name: "defaultDescription", title: "Default description", description: "SEO description used unless a page overrides it.", type: "text", rows: 3 },
  ]),
  preview: { prepare: () => ({ title: "Site meta (SEO)" }) },
});
