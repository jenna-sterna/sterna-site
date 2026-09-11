#!/usr/bin/env node
/**
 * Add the moliceiro canal tour as a new experience (order 10).
 * Idempotent — safe to re-run (uses createOrReplace with a stable _id).
 *
 * Run: SANITY_WRITE_TOKEN=sk... node scripts/add-moliceiro.mjs
 */

import { createClient } from "@sanity/client";

const TOKEN = process.env.SANITY_WRITE_TOKEN;
if (!TOKEN) {
  console.error("✗ SANITY_WRITE_TOKEN is not set.");
  process.exit(1);
}

const client = createClient({
  projectId: "jghpyuue",
  dataset: "production",
  apiVersion: "2024-01-01",
  token: TOKEN,
  useCdn: false,
});

const SLUG = "moliceiro-canal-tour";
const DOC_ID = `experience-${SLUG}`;

const doc = {
  _id: DOC_ID,
  _type: "experience",
  slug: { _type: "slug", current: SLUG },
  order: 10,
  featured: false,
  category: "nature",
  categoryLabelEn: "Nature & Water",
  categoryLabelPt: "Natureza e Água",

  nameEn: "Moliceiro Boat Tour Around the Aveiro Canals",
  namePt: "Passeio de Moliceiro pelos Canais de Aveiro",

  shortEn: "Iconic 45-minute canal tour aboard a traditional moliceiro",
  shortPt: "O passeio icónico de 45 minutos num moliceiro tradicional",

  oneLinerEn:
    "It's our iconic tour around the canals of Aveiro with a local guide. You'll get a great feel for our town via the unique canals. Bring a hat, water, and sunscreen for those beautiful sunny Portuguese days.",
  oneLinerPt:
    "É o nosso passeio icónico pelos canais de Aveiro com guia local. Uma ótima forma de conhecer a cidade a partir dos canais. Traga chapéu, água e protetor solar para os belos dias soalheiros portugueses.",

  durationEn: "45 minutes",
  durationPt: "45 minutos",

  includedEn: [
    "45-minute ride aboard a traditional moliceiro boat",
    "Live commentary from a local guide",
    "Shared boat with other travellers",
  ],
  includedPt: [
    "Passeio de 45 minutos num moliceiro tradicional",
    "Comentário ao vivo de um guia local",
    "Barco partilhado com outros viajantes",
  ],

  priceNoteEn: "Message us for more details.",
  priceNotePt: "Contacte-nos para mais informações.",
};

async function run() {
  console.log("");
  console.log(`→ Checking for existing document at ${DOC_ID}…`);
  const existing = await client.getDocument(DOC_ID);
  if (existing) {
    console.log(`  ! already exists — will overwrite`);
  } else {
    console.log(`  · not found — will create new`);
  }

  console.log("");
  console.log("→ Writing document…");
  const result = await client.createOrReplace(doc);
  console.log(`  ✓ saved ${result._id} (order ${result.order})`);

  console.log("");
  console.log(
    "✓ Done. Webhook will trigger a Netlify rebuild; live in ~90 seconds.",
  );
  console.log(
    `  Verify: https://sterna-aveiro.netlify.app/experiences/${SLUG}/`,
  );
  console.log("");
  console.log("  Reminder: no photo yet. Sandra can add one via the Studio.");
  console.log("");
}

run().catch((err) => {
  console.error("");
  console.error("✗ Failed:");
  console.error(err);
  process.exit(1);
});
