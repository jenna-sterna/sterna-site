import { defineType } from "sanity";
import { pairs } from "./_helpers";

export default defineType({
  name: "nav",
  title: "Navigation labels",
  type: "document",
  fields: pairs([
    { name: "home",         title: "‘Home’ link label" },
    { name: "experiences",  title: "‘Experiences’ link label" },
    { name: "about",        title: "‘About’ link label" },
    { name: "faq",          title: "‘FAQ’ link label" },
    { name: "contact",      title: "‘Contact’ link label" },
    { name: "plan",         title: "‘Plan your trip’ label", required: false },
    { name: "whatsapp",     title: "WhatsApp button label", required: false },
    { name: "langLabel",    title: "Language toggle label", required: false },
    { name: "langAriaLabel",title: "Language toggle aria-label", required: false },
  ]),
  preview: { prepare: () => ({ title: "Navigation labels" }) },
});
