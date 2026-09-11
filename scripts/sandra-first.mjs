#!/usr/bin/env node
/**
 * Reorder team + about-page + homepage to lead with Sandra.
 *   • Founders: Sandra = 1, Jenna = 2, Carlos = 3
 *   • About page: reorder intro name list, reorder "How we met" paragraphs
 *     (keep existing copy verbatim, just swap positions), reorder signature
 *   • Homepage intro signature: same reorder
 *
 * Idempotent — reruns just overwrite with the same values.
 *
 * Run: SANITY_WRITE_TOKEN=sk... node scripts/sandra-first.mjs
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

async function run() {
  console.log("");

  // ── 1. Reorder founder docs ─────────────────────────────────────────────
  console.log("→ Reordering team members (Sandra → Jenna → Carlos)");
  const founders = await client.fetch(
    `*[_type == "founder"]{ _id, slug, nameEn, order }`,
  );
  const bySlug = Object.fromEntries(
    founders.map((f) => [f.slug?.current ?? f._id, f]),
  );
  const wantOrder = { sandra: 1, jenna: 2, carlos: 3 };
  for (const [slug, order] of Object.entries(wantOrder)) {
    const doc = bySlug[slug] || bySlug[`founder-${slug}`] || founders.find((f) => (f._id || "").endsWith(slug));
    if (!doc) {
      console.log(`  ! could not find founder "${slug}" — skipping`);
      continue;
    }
    if (doc.order === order) {
      console.log(`  · ${doc.nameEn}: already order ${order}`);
      continue;
    }
    await client.patch(doc._id).set({ order }).commit();
    console.log(`  ✓ ${doc.nameEn}: order ${doc.order ?? "?"} → ${order}`);
  }

  // ── 2. About page: intro lead, story paragraphs, signature ──────────────
  console.log("");
  console.log("→ Reordering About page copy");
  const about = await client.getDocument("aboutPage");
  if (!about) {
    console.log("  ! aboutPage document missing — skipping");
  } else {
    const patch = {};

    // Intro paragraph — reorder name list
    patch.lead_en = (about.lead_en ?? "").replace(
      /Jenna,\s*Carlos\s*&\s*Sandra/,
      "Sandra, Jenna & Carlos",
    );
    patch.lead_pt = (about.lead_pt ?? "")
      .replace(/a\s*Jenna,\s*o\s*Carlos\s*e\s*a\s*Sandra/, "a Sandra, a Jenna e o Carlos")
      .replace(/Jenna,\s*Carlos\s*e\s*Sandra/, "Sandra, Jenna e Carlos");

    // Story signature
    const swapSig = (s) =>
      (s ?? "")
        .replace(/Jenna,\s*Carlos\s*&\s*Sandra/, "Sandra, Jenna & Carlos")
        .replace(/Jenna,\s*Carlos\s*e\s*Sandra/, "Sandra, Jenna e Carlos");
    patch.storySig_en = swapSig(about.storySig_en);
    patch.storySig_pt = swapSig(about.storySig_pt);

    // Shuffle story paragraphs:
    //   old:  para1 = Jenna, para2 = Carlos, para3 = Sandra, para4 = shared
    //   new:  para1 = Sandra, para2 = Jenna,  para3 = Carlos, para4 = shared
    patch.storyPara1_en = about.storyPara3_en;
    patch.storyPara1_pt = about.storyPara3_pt;
    patch.storyPara2_en = about.storyPara1_en;
    patch.storyPara2_pt = about.storyPara1_pt;
    patch.storyPara3_en = about.storyPara2_en;
    patch.storyPara3_pt = about.storyPara2_pt;
    // storyPara4 unchanged

    await client.patch("aboutPage").set(patch).commit();
    console.log("  ✓ About page: intro, story paragraphs, signature updated");
  }

  // ── 3. Homepage intro signature (same reorder) ──────────────────────────
  console.log("");
  console.log("→ Updating Homepage intro signature");
  const home = await client.getDocument("homePage");
  if (!home) {
    console.log("  ! homePage document missing — skipping");
  } else {
    const patch = {
      intro_sig_en: (home.intro_sig_en ?? "").replace(
        /Jenna,\s*Carlos\s*&\s*Sandra/,
        "Sandra, Jenna & Carlos",
      ),
      intro_sig_pt: (home.intro_sig_pt ?? "")
        .replace(/Jenna,\s*Carlos\s*&\s*Sandra/, "Sandra, Jenna & Carlos")
        .replace(/Jenna,\s*Carlos\s*e\s*Sandra/, "Sandra, Jenna e Carlos"),
    };
    await client.patch("homePage").set(patch).commit();
    console.log("  ✓ Homepage intro signature updated");
  }

  console.log("");
  console.log("✓ Done. Webhook will trigger a Netlify rebuild; live in ~90 sec.");
  console.log("  Verify:");
  console.log("    • https://sterna-aveiro.netlify.app/about/");
  console.log("    • https://sterna-aveiro.netlify.app/  (intro signature)");
  console.log("");
}

run().catch((err) => {
  console.error("");
  console.error("✗ Failed:");
  console.error(err);
  process.exit(1);
});
