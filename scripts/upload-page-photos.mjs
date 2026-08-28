#!/usr/bin/env node
/**
 * Upload the currently-hardcoded homepage / about-page photos to Sanity and
 * patch the existing `homePage` + `aboutPage` documents so the new image
 * fields point at them.
 *
 * This is a targeted follow-up to `scripts/migrate-to-sanity.mjs`. That script
 * seeds every document; this one just fills the image slots that were added
 * after the initial migration ran. Safe to re-run — assets are looked up by
 * SHA-1 of the file bytes and existing uploads are reused, and the document
 * patches use `set`, so re-running just overwrites with the same reference.
 *
 * ── How to run ────────────────────────────────────────────────────────────
 *   1. Grab a write token: https://sanity.io/manage/project/jghpyuue/api
 *      (Add API token → Editor permissions.)
 *   2. From the repo root:
 *
 *        SANITY_WRITE_TOKEN=sk... node scripts/upload-page-photos.mjs
 *
 * ─────────────────────────────────────────────────────────────────────────
 */

import { createClient } from "@sanity/client";
import crypto from "node:crypto";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, "..");
const PUBLIC_DIR = path.join(REPO_ROOT, "public");

const PROJECT_ID = "jghpyuue";
const DATASET = "production";
const TOKEN = process.env.SANITY_WRITE_TOKEN;

if (!TOKEN) {
  console.error("");
  console.error("\u2717 SANITY_WRITE_TOKEN is not set.");
  console.error("");
  console.error("  How to get one:");
  console.error("    1. Open https://sanity.io/manage/project/jghpyuue/api");
  console.error("    2. Click 'Add API token' \u2014 Name: page-photo upload, Permissions: Editor");
  console.error("    3. Copy the token (starts with 'sk...')");
  console.error("");
  console.error("  Then re-run:");
  console.error("    SANITY_WRITE_TOKEN=sk... node scripts/upload-page-photos.mjs");
  console.error("");
  process.exit(1);
}

const client = createClient({
  projectId: PROJECT_ID,
  dataset: DATASET,
  apiVersion: "2024-01-01",
  token: TOKEN,
  useCdn: false,
});

/* ────────────────────────────────────────────────────────────────────────
   Which photo goes in which field.
   ──────────────────────────────────────────────────────────────────────── */
const HOME_PHOTOS = {
  heroImage:         "/uploads/hero/aveiro-canal-hero.jpg",
  saltPansImageMain: "/uploads/salt-pans/IMG_4709.jpg",
  saltPansImageMini: "/uploads/salt-pans/IMG_4710.jpg",
  walkingImage:      "/uploads/walking-tour/20260711_112249.jpg",
  foundersPhoto1:    "/uploads/walking-tour/20260702_153535(1).jpg",
  foundersPhoto2:    "/uploads/walking-tour/20260711_120135.jpg",
  foundersPhoto3:    "/uploads/salt-pans/IMG_4710.jpg",
};

const ABOUT_PHOTOS = {
  storyImage: "/uploads/walking-tour/20260711_120135.jpg",
  whyImage:   "/uploads/boat-tour/20260704_204620~2.jpg",
};

/* ────────────────────────────────────────────────────────────────────────
   Idempotent upload — reuses the same asset if the same file bytes are
   uploaded twice, so re-running never duplicates.
   ──────────────────────────────────────────────────────────────────────── */
const uploadedByAbs = new Map(); // abs path -> asset id (in-process cache)

async function uploadOrReuse(publicPath) {
  if (!publicPath) return undefined;
  const rel = publicPath.replace(/^\/+/, "");
  const abs = path.join(PUBLIC_DIR, rel);
  if (uploadedByAbs.has(abs)) return uploadedByAbs.get(abs);
  if (!fs.existsSync(abs)) {
    console.warn(`  \u00b7 missing file, skipping: ${publicPath}`);
    return undefined;
  }
  const buf = fs.readFileSync(abs);
  const filename = path.basename(abs);
  // Compute the same content hash Sanity uses so we can spot existing uploads.
  const sha1 = crypto.createHash("sha1").update(buf).digest("hex");
  const existing = await client.fetch(
    `*[_type == "sanity.imageAsset" && sha1hash == $sha1][0]{ _id }`,
    { sha1 },
  );
  if (existing?._id) {
    process.stdout.write(`  \u00b7 reuse ${filename}\n`);
    uploadedByAbs.set(abs, existing._id);
    return existing._id;
  }
  process.stdout.write(`  \u00b7 upload ${filename} \u2026 `);
  const asset = await client.assets.upload("image", buf, { filename });
  process.stdout.write(`ok\n`);
  uploadedByAbs.set(abs, asset._id);
  return asset._id;
}

function imageRef(assetId) {
  return { _type: "image", asset: { _type: "reference", _ref: assetId } };
}

async function patchDocument(docId, fieldsToPathsMap) {
  const patch = {};
  for (const [field, filePath] of Object.entries(fieldsToPathsMap)) {
    const assetId = await uploadOrReuse(filePath);
    if (assetId) patch[field] = imageRef(assetId);
  }
  if (Object.keys(patch).length === 0) {
    console.log(`  \u2717 nothing to patch on ${docId}`);
    return;
  }
  await client.patch(docId).set(patch).commit({ autoGenerateArrayKeys: true });
  console.log(`  \u2713 patched ${docId} with ${Object.keys(patch).length} image field(s)`);
}

async function run() {
  console.log("");
  console.log(`Uploading page photos to Sanity project: ${PROJECT_ID} / ${DATASET}`);
  console.log("");

  console.log("\u2192 Homepage photos");
  await patchDocument("homePage", HOME_PHOTOS);

  console.log("");
  console.log("\u2192 About-page photos");
  await patchDocument("aboutPage", ABOUT_PHOTOS);

  console.log("");
  console.log("\u2713 Done. Editors can now swap any of these photos from the Studio (Photos section).");
  console.log("");
}

run().catch((err) => {
  console.error("");
  console.error("\u2717 Upload failed:");
  console.error(err);
  process.exit(1);
});
