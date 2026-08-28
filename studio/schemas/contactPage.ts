import { defineType } from "sanity";
import { pairs } from "./_helpers";

export default defineType({
  name: "contactPage",
  title: "Contact page",
  type: "document",
  fieldsets: [
    { name: "hero",    title: "1. Page hero",           options: { collapsible: true, collapsed: false } },
    { name: "side",    title: "2. Contact side blocks", options: { collapsible: true, collapsed: true } },
    { name: "form",    title: "3. Enquiry form labels", options: { collapsible: true, collapsed: true } },
  ],
  fields: pairs([
    { fieldset: "hero", name: "eyebrow", title: "Page eyebrow" },
    { fieldset: "hero", name: "h1Line1", title: "Headline — line 1" },
    { fieldset: "hero", name: "h1Line2", title: "Headline — line 2 (italic)" },
    { fieldset: "hero", name: "lead",    title: "Lead paragraph", type: "text", rows: 3 },

    { fieldset: "side", name: "whatsappLabel", title: "WhatsApp label" },
    { fieldset: "side", name: "whatsappHint",  title: "WhatsApp hint", type: "text", rows: 2 },
    { fieldset: "side", name: "emailLabel",    title: "Email label" },
    { fieldset: "side", name: "emailHint",     title: "Email hint", type: "text", rows: 2 },
    { fieldset: "side", name: "instaLabel",    title: "Instagram label" },
    { fieldset: "side", name: "instaHint",     title: "Instagram hint", type: "text", rows: 2 },
    { fieldset: "side", name: "taLabel",       title: "TripAdvisor label" },
    { fieldset: "side", name: "taValue",       title: "TripAdvisor value" },
    { fieldset: "side", name: "taHint",        title: "TripAdvisor hint", type: "text", rows: 2 },
    { fieldset: "side", name: "basedLabel",    title: "Based-in label" },
    { fieldset: "side", name: "basedValue",    title: "Based-in value" },
    { fieldset: "side", name: "basedHint",     title: "Based-in hint", type: "text", rows: 2 },

    { fieldset: "form", name: "fName",       title: "‘Your name’ label" },
    { fieldset: "form", name: "fEmail",      title: "‘Email’ label" },
    { fieldset: "form", name: "fDates",      title: "‘Dates’ label" },
    { fieldset: "form", name: "fDatesPh",    title: "‘Dates’ placeholder" },
    { fieldset: "form", name: "fPeople",     title: "‘Number of people’ label" },
    { fieldset: "form", name: "fPeoplePh",   title: "‘Number of people’ placeholder" },
    { fieldset: "form", name: "fInterests",  title: "‘Interests’ label" },
    { fieldset: "form", name: "fNotes",      title: "‘Notes’ label" },
    { fieldset: "form", name: "fNotesPh",    title: "‘Notes’ placeholder", type: "text", rows: 2 },
    { fieldset: "form", name: "fSubmit",     title: "Submit button label" },
    { fieldset: "form", name: "fNoteA",      title: "Form note — before link", type: "text", rows: 2 },
    { fieldset: "form", name: "fNoteB",      title: "Form note — link text" },
    { fieldset: "form", name: "fNoteC",      title: "Form note — after link" },
    { fieldset: "form", name: "interestSomethingCustom", title: "‘Something custom’ option label" },
  ]),
  preview: { prepare: () => ({ title: "Contact page" }) },
});
