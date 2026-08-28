import { defineType } from "sanity";
import { pairs } from "./_helpers";

/**
 * Singleton document — the copy that appears on the homepage.
 * Field names use the pattern `<section>_<field>_<en|pt>` to match how the
 * Astro components read them via pick(home, "hero_eyebrow", lang).
 */
export default defineType({
  name: "homePage",
  title: "Homepage",
  type: "document",
  fieldsets: [
    { name: "hero",     title: "1. Hero (top of page)",       options: { collapsible: true, collapsed: false } },
    { name: "intro",    title: "2. Intro paragraph",           options: { collapsible: true, collapsed: true } },
    { name: "featured", title: "3. Featured #1 — Salt pans",   options: { collapsible: true, collapsed: true } },
    { name: "duo",      title: "4. Featured duo (kickers)",    options: { collapsible: true, collapsed: true } },
    { name: "listExp",  title: "5. Three more experiences",    options: { collapsible: true, collapsed: true } },
    { name: "why",      title: "6. Why-list (terracotta band)",options: { collapsible: true, collapsed: true } },
    { name: "proof",    title: "7. Reviews section",           options: { collapsible: true, collapsed: true } },
    { name: "founders", title: "8. Founders teaser",           options: { collapsible: true, collapsed: true } },
    { name: "cta",      title: "9. Call-to-action band",       options: { collapsible: true, collapsed: true } },
  ],
  fields: pairs([
    // HERO
    { fieldset: "hero", name: "hero_eyebrow",       title: "Hero eyebrow", description: "Small uppercase tag above the headline (e.g. ‘Aveiro · Portugal’)." },
    { fieldset: "hero", name: "hero_line1",         title: "Hero headline — line 1", description: "First line of the big headline." },
    { fieldset: "hero", name: "hero_line2",         title: "Hero headline — line 2", description: "Second line." },
    { fieldset: "hero", name: "hero_line3",         title: "Hero headline — line 3 (italic)", description: "Third line, shown in italic ochre." },
    { fieldset: "hero", name: "hero_lead",          title: "Hero paragraph", description: "The paragraph under the headline.", type: "text", rows: 4 },
    { fieldset: "hero", name: "hero_ctaPrimary",    title: "Primary button label" },
    { fieldset: "hero", name: "hero_ctaSecondary",  title: "Secondary button label" },
    { fieldset: "hero", name: "hero_trustPrefix",   title: "Trust prefix (before the number)", required: false },
    { fieldset: "hero", name: "hero_trustNumber",   title: "Trust number (e.g. ‘300+’)" },
    { fieldset: "hero", name: "hero_trustSuffix",   title: "Trust suffix (after the number)" },
    { fieldset: "hero", name: "hero_scroll",        title: "Scroll hint label" },

    // INTRO
    { fieldset: "intro", name: "intro_caption",     title: "Intro caption", description: "Small uppercase label above the paragraph." },
    { fieldset: "intro", name: "intro_body",        title: "Intro paragraph", description: "The main paragraph — a note from the team.", type: "text", rows: 6 },
    { fieldset: "intro", name: "intro_sig",         title: "Signature line", description: "E.g. ‘Jenna, Carlos & Sandra’." },

    // FEATURED (Salt pans)
    { fieldset: "featured", name: "featured_number",    title: "Section number", description: "E.g. ‘01’." },
    { fieldset: "featured", name: "featured_eyebrow",   title: "Section eyebrow" },
    { fieldset: "featured", name: "featured_hookLine1", title: "Headline — line 1" },
    { fieldset: "featured", name: "featured_hookLine2", title: "Headline — line 2 (italic)" },
    { fieldset: "featured", name: "featured_copyLead",  title: "Lead paragraph", type: "text", rows: 4 },
    { fieldset: "featured", name: "featured_pullQuote", title: "Pull quote", description: "The italic quote next to the photo.", type: "text", rows: 3 },
    { fieldset: "featured", name: "featured_annotation",title: "Photo annotation", description: "Handwriting-style caption on the photo (e.g. ‘← that’s Senhor Álvaro’)." },
    { fieldset: "featured", name: "featured_cta",       title: "Button label" },

    // DUO
    { fieldset: "duo", name: "duo_eyebrow",     title: "Duo section eyebrow" },
    { fieldset: "duo", name: "duo_w1Kicker",    title: "Card 1 kicker", description: "Small label above the first card (e.g. ‘02 · Food & wine’)." },
    { fieldset: "duo", name: "duo_w2Kicker",    title: "Card 2 kicker" },

    // LIST EXP
    { fieldset: "listExp", name: "listExp_eyebrow",     title: "List section eyebrow" },
    { fieldset: "listExp", name: "listExp_leadPrefix",  title: "Lead — main sentence", description: "Longer paragraph intro.", type: "text", rows: 2 },
    { fieldset: "listExp", name: "listExp_leadEmph",    title: "Lead — italic finish", description: "Italic finish to the lead sentence." },
    { fieldset: "listExp", name: "listExp_ctaAll",      title: "Button label (see all)" },

    // WHY
    { fieldset: "why", name: "whyList_eyebrow",  title: "Section eyebrow" },
    { fieldset: "why", name: "whyList_h2",       title: "Headline" },
    { fieldset: "why", name: "whyList_body",     title: "Body paragraph", type: "text", rows: 5 },
    { fieldset: "why", name: "whyList_ask",      title: "Sign-off (handwritten style)" },

    // PROOF
    { fieldset: "proof", name: "proof_h2Line1",  title: "Headline — line 1" },
    { fieldset: "proof", name: "proof_h2Line2",  title: "Headline — line 2 (italic)" },
    { fieldset: "proof", name: "proof_lead",     title: "Lead paragraph", type: "text", rows: 4 },
    { fieldset: "proof", name: "proof_cta",      title: "Link label (to TripAdvisor)" },

    // FOUNDERS TEASER
    { fieldset: "founders", name: "founders_eyebrow",  title: "Founders eyebrow" },
    { fieldset: "founders", name: "founders_h2Line1",  title: "Headline — line 1" },
    { fieldset: "founders", name: "founders_h2Line2",  title: "Headline — line 2 (italic)" },
    { fieldset: "founders", name: "founders_body",     title: "Body paragraph", type: "text", rows: 4 },
    { fieldset: "founders", name: "founders_ctaMore",  title: "Link label" },

    // CTA
    { fieldset: "cta", name: "cta_eyebrow",   title: "CTA eyebrow", required: false },
    { fieldset: "cta", name: "cta_h2",        title: "CTA headline" },
    { fieldset: "cta", name: "cta_lead",      title: "CTA paragraph", type: "text", rows: 3 },
    { fieldset: "cta", name: "cta_obrigado",  title: "Handwritten thank-you" },
    { fieldset: "cta", name: "cta_whatsapp",  title: "WhatsApp button label" },
    { fieldset: "cta", name: "cta_email",     title: "Email button label" },
  ]),
  preview: {
    prepare: () => ({ title: "Homepage" }),
  },
});
