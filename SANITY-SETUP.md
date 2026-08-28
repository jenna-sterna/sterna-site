# Sanity setup notes (for Braiden)

Everything specific to running / deploying the Sterna Aveiro Sanity stack.

## Project details

- **Project ID:** `jghpyuue`
- **Dataset:** `production`
- **Studio URL:** `https://sterna-aveiro.sanity.studio`
- **Dashboard:** https://sanity.io/manage/project/jghpyuue

## First-time migration

The migration script `scripts/migrate-to-sanity.mjs` seeds every document in
one pass — company info, trust badges, 9 experiences (with hero photos +
galleries uploaded to Sanity), 3 founders, 9 FAQs, 10 reviews, and all page
singletons.

1. Go to https://sanity.io/manage/project/jghpyuue/api → **API tokens**.
2. Click **Add API token**. Name it "migration script". Role: **Editor**.
3. Copy the token (starts with `sk...`).
4. From the repo root, run:

   ```
   SANITY_WRITE_TOKEN=sk-your-token-here npm run migrate
   ```

5. Watch the log — each upload prints one line. Any missing images
   (e.g. `mealhada/hero.jpg` that doesn't exist yet) are skipped with a
   warning, not an error.
6. Delete the token at Sanity → API tokens → Revoke when the migration is
   done.

The script is idempotent — re-running it overwrites the same documents by
stable ID so nothing gets duplicated.

## Deploying the Studio

The Studio is a separate npm project in `studio/`.

```bash
cd studio
npm install       # first time only
npm run dev       # local dev at http://localhost:3333
npm run deploy    # push to sterna-aveiro.sanity.studio
```

The `studioHost: "sterna-aveiro"` in `sanity.cli.ts` locks in the
subdomain — you shouldn't be prompted for it again once claimed. If the
first deploy asks, type `sterna-aveiro`.

## Netlify env vars

The site reads Sanity's project ID and dataset at build time. Neither is
strictly secret (a Sanity project ID is public), but setting them explicitly
in Netlify keeps things clear.

**Site settings → Build & deploy → Environment → Environment variables:**

| Key                 | Value        |
| ------------------- | ------------ |
| `SANITY_PROJECT_ID` | `jghpyuue`   |
| `SANITY_DATASET`    | `production` |

Do NOT set `SANITY_READ_TOKEN` unless you want the site to fetch drafts. Leave
it blank in prod so the site uses the public CDN.

## Sanity → Netlify build webhook

So Sandra clicking "Publish" triggers a fresh site build:

1. In **Netlify**: Site settings → Build & deploy → **Build hooks** →
   **Add build hook**. Name it "sanity-publish". Copy the URL (starts with
   `https://api.netlify.com/build_hooks/...`).
2. In **Sanity**: https://sanity.io/manage/project/jghpyuue/api → **Webhooks**
   → **Create webhook**.
   - Name: "Netlify rebuild"
   - URL: paste the Netlify build hook URL
   - Dataset: `production`
   - Trigger on: `Create`, `Update`, `Delete`
   - HTTP method: `POST`
   - Leave "Filter" and "Projection" empty (so it triggers on any change)
3. Save. Test it by publishing any small edit in the Studio and checking
   that Netlify starts a new build within ~10 seconds.

## Inviting Sandra / other editors

Sanity → Members → **Invite** → enter email, pick role **Editor** (not
Administrator). She'll get an email; when she clicks the link she'll be
signed into `sterna-aveiro.sanity.studio` immediately.

## Local dev

To run the Astro site with the same Sanity data:

```bash
npm run dev
```

The site reads the public `production` dataset by default — no `.env` file
needed. Copy `.env.example` to `.env` only if you want to preview draft
content locally (requires a Viewer/Editor token).

## Rolling back the migration

Sanity has full document version history in the Studio (Document → History).
For a full-project rollback, use `npx sanity dataset copy production old-snapshot`
before running anything destructive.

## Fallback behaviour

If Sanity is unreachable or the project is empty (e.g. mid-migration), the
site still builds — it just renders empty strings. Logs will show
`[sanity] Query failed, using fallback.` This means Netlify will never fail
a deploy because of a Sanity outage.
