#!/usr/bin/env node
/**
 * Update the existing Praia de Mira experience with the client's new,
 * more detailed content. Idempotent — safe to re-run.
 *
 * Run: SANITY_WRITE_TOKEN=sk... node scripts/update-praia-de-mira.mjs
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

const DOC_ID = "experience-praia-de-mira";

const patch = {
  nameEn: "Explore Praia de Mira's Beach Community & Culture",
  namePt: "Descubra a Praia de Mira: comunidade balnear e cultura",

  shortEn: "Beach town, family-run charcoal chicken, dunes",
  shortPt: "Vila balnear, frango no carvão em restaurante familiar, dunas",

  categoryLabelEn: "Beach & community",
  categoryLabelPt: "Praia e comunidade",

  oneLinerEn:
    "Praia de Mira is home to an incredible community that makes you feel like family from the moment you step into the town. You can enjoy beach time, walk the lagoon trail, jump into a paddle boat, check out local cafés, and restaurants. Come experience one of the best family-owned-for-decades roasted chicken restaurants in the area with the owner and chef himself, and a first-hand look inside their charcoal grill kitchen.",
  oneLinerPt:
    "A Praia de Mira acolhe-o com uma comunidade que o faz sentir em família desde o primeiro momento. Aproveite a praia, o trilho da lagoa, um passeio de gaivota, cafés locais e restaurantes tradicionais. Venha conhecer um dos melhores restaurantes de frango no carvão da região — familiar há décadas — em conversa com o próprio proprietário e chef, com visita à cozinha e à grelha a carvão.",

  durationEn: "Half or full day",
  durationPt: "Meio-dia ou dia inteiro",

  includedEn: [
    "Pick-up and drop-off from Aveiro city centre",
    "Guided tour of the village",
    "Lunch with sides, dessert, wines, tea/coffee & water",
    "Roasted-chicken demo and Q&A with the owner-chef",
    "Vegetarian and fish options on request",
  ],
  includedPt: [
    "Recolha e regresso ao centro de Aveiro",
    "Visita guiada à vila",
    "Almoço com acompanhamentos, sobremesa, vinhos, chá/café e água",
    "Demonstração de frango no carvão com perguntas e respostas ao proprietário e chef",
    "Opções vegetarianas e de peixe mediante pedido",
  ],

  addOnsEn: [
    "Paddleboarding",
    "Paddle-boat rental on the lagoon",
    "Buggy / 4-wheel excursion on the dunes",
  ],
  addOnsPt: [
    "Stand-up paddle",
    "Aluguer de gaivota a pedal na lagoa",
    "Passeio de buggy ou 4x4 nas dunas",
  ],

  priceNoteEn:
    "Message us via email or WhatsApp — pricing varies by preferences, group size, transport options, day and time.",
  priceNotePt:
    "Contacte-nos por email ou WhatsApp — o preço varia consoante preferências, número de pessoas, opções de transporte, dia e hora.",
};

async function run() {
  console.log("");
  console.log("→ Fetching existing Praia de Mira document…");
  const existing = await client.getDocument(DOC_ID);
  if (!existing) {
    console.error(`✗ No document found with _id "${DOC_ID}".`);
    process.exit(1);
  }
  console.log(`  ✓ found: "${existing.nameEn}" (order ${existing.order})`);

  console.log("");
  console.log("→ Applying updated fields…");
  await client
    .patch(DOC_ID)
    .set(patch)
    .commit({ autoGenerateArrayKeys: true });
  console.log(`  ✓ patched ${Object.keys(patch).length} field(s) on ${DOC_ID}`);

  console.log("");
  console.log(
    "✓ Done. Webhook will trigger a Netlify rebuild; live in ~90 seconds.",
  );
  console.log(
    "  Verify: https://sterna-aveiro.netlify.app/experiences/praia-de-mira/",
  );
  console.log("");
}

run().catch((err) => {
  console.error("");
  console.error("✗ Update failed:");
  console.error(err);
  process.exit(1);
});
