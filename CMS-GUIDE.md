# Sandra's guide to editing the website

Everything on the Sterna Aveiro website — words, photos, prices, contact
info — lives in a small dashboard called **Sanity Studio**. This guide walks
through the essentials.

## Signing in

1. Open **[sterna-aveiro.sanity.studio](https://sterna-aveiro.sanity.studio)**
   in any browser.
2. Sign in with the same email address Braiden used when he invited you.
   You'll get a magic link — click it and you're in.

If you don't see an invite, ask Braiden to send one (he can invite you from
the Sanity dashboard → Members → Invite).

## The layout

Once you're in, the left sidebar has three groups:

### Content
Things you add/remove/reorder as they change.

- **Experiences** — the nine (or however many) trips you offer. Add, edit,
  duplicate, or archive. Each one has bilingual (English/Portuguese) fields.
- **Founders** — you, Carlos, Jenna. Photos, roles, one-liners.
- **FAQs** — the questions on the /faq page.
- **Reviews** — verbatim TripAdvisor / Google reviews shown on the homepage
  and about page.

### Pages
The words on each page. These are single, fixed documents (not lists) — you
edit them, you don't create new ones.

- **Homepage** — every section on `/` and `/pt/` (hero, intro, featured,
  duos, why, proof, founders teaser, CTA).
- **About page** — copy for `/about/` and `/pt/about/`.
- **FAQ page (intro copy)** — the headline & intro at the top of the FAQ page
  (individual questions live under Content → FAQs).
- **Contact page** — labels for the contact page, contact-side blocks, and
  the enquiry form.
- **Experiences page (intro copy)** — headline + intros for the experiences
  index page.
- **Experience detail (shared labels)** — the labels shared across every
  experience page (side info, "What's included", "Related", etc.).
- **Navigation labels** — the words in the top nav (Home, Experiences, About,
  FAQ, Contact, plus the WhatsApp button).
- **Footer** — tagline, column headings, copyright line.
- **Site meta (SEO)** — default page title & description used by Google and
  when someone shares a link.

### Site
Contact information and trust markers used across the whole site.

- **Contact info** — phone, WhatsApp, email, Instagram, TripAdvisor, address,
  max group size, etc.
- **Trust badges** — the small "Licensed & insured / 300+ reviews" chips.

## Everyday tasks

**Change a photo.** Click the section (e.g. Experiences → Salt pans lunch),
scroll to the photo field, click the existing photo, and choose "Replace".
Upload a new one. Click **Publish** in the bottom-right.

**Fix a typo.** Find the copy in the relevant page section. Click into the
field, edit, click **Publish**.

**Add a new experience.** Content → Experiences → **Create new**. Fill in
every field (English + Portuguese). Upload a hero photo (landscape, at least
1600px wide) and 4–8 gallery photos. Click Publish.

**Reorder something.** Every list (Experiences, Founders, FAQs, Reviews) has
an **Order** field. Lower numbers appear first. Change the number, publish,
done.

**Preview before publishing.** Sanity keeps a draft as you type. Nothing goes
live until you click **Publish**.

**Add or update a review.** Content → Reviews → Create new (or open an
existing one). Copy the reviewer's name, month/year (and city if visible),
star rating, and the full quote. Both `Quote (English)` and
`Quote (Portuguese)` fields are required — for real quotes we typically paste
the same text into both. Set the `Order` — lower numbers appear first, and
only the first six show on the homepage.

## Bilingual fields (EN / PT)

Every text field appears twice — once labelled "(English)" and once
labelled "(Portuguese)". Both are required. If the copy is identical in both
languages (like a proper noun, a date, or a URL), just paste the same text
into both.

## How changes go live

- **Sanity** publishes instantly — as soon as you click Publish, the new
  copy is live in Sanity's database.
- **The website** then rebuilds automatically (this takes ~1–2 minutes).
  Refresh the site to see your changes.

If the automatic rebuild isn't working, ask Braiden — it may need to be
re-connected on Netlify's side.

## Something's broken?

WhatsApp Braiden. Screenshots help.
