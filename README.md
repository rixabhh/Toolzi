# Toolzi

<p align="center">
  <img src="./public/favicon.svg" width="84" height="84" alt="Toolzi logo" />
</p>

<h3 align="center">Tiny tools for everyday stuff.</h3>

<p align="center">
  Compress images, merge PDFs, make QR codes, clean text, calculate GST, create invoices, and more. Toolzi runs in the browser, so files stay on the user's device.
</p>

## Overview

Toolzi is a privacy-first browser utility toolkit built as a React single-page app. It is designed for quick everyday tasks without uploads, accounts, or server-side file processing.

Core product promise:

- Files stay local in the browser.
- No sign-up is required.
- Tools are fast, searchable, and grouped by task.
- Notes, todos, favorites, recent tools, and invoice drafts stay in local browser storage.

## Tool Categories

- PDF: merge PDFs, split PDFs, image to PDF, Markdown to PDF.
- Image: compress, resize, convert, and remove simple solid backgrounds.
- Text: count words, convert case, and clean copied text.
- Calculate: GST, percentages, dates, age, BMI, EMI, and units.
- Create: QR codes, invoices, signatures, favicons, and brat-style memes.
- Productivity: notes, todos, Pomodoro, stopwatch, and countdown.
- Developer: JSON, Base64, URLs, UUIDs, regex, colors, gradients, HTML, CSV, and diffs.
- Privacy: passwords, password strength, and SHA-256 file hashes.

## Tech Stack

- React, Vite, TypeScript
- React Router
- Tailwind CSS plus custom neumorphic design tokens
- pdf-lib for browser PDF work
- qrcode for QR generation
- browser-image-compression and Canvas APIs for image tools
- localStorage for local-only user data
- Cloudflare Workers Static Assets for deployment

## Local Development

```bash
npm install
npm run dev
```

Vite will print the local URL, usually `http://localhost:5173`.

## Quality Checks

```bash
npm test
npm run build
```

`npm run build` runs TypeScript and creates the production assets in `dist/`.

## Cloudflare Workers Deployment

Toolzi uses Workers Static Assets through `wrangler.json`:

```json
{
  "name": "toolzi",
  "compatibility_date": "2026-05-20",
  "assets": {
    "directory": "./dist",
    "not_found_handling": "single-page-application"
  }
}
```

### Manual Deploy

1. Install dependencies:

```bash
npm install
```

2. Authenticate Wrangler:

```bash
npx wrangler login
```

3. Build and deploy:

```bash
npm run deploy
```

### GitHub Actions Deploy

The workflow at `.github/workflows/deploy-cloudflare-workers.yml` deploys on pushes to `main` and can also be run manually.

Add these repository secrets in GitHub:

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

Recommended token permissions:

- Account: Workers Scripts Edit
- Account: Workers Builds Edit, if enabled on the account
- Zone: Workers Routes Edit, only if using custom routes

The workflow runs:

```bash
npm ci
npm test
npm run build
wrangler deploy
```

## Deployment Notes

- SPA fallback is handled by `not_found_handling: "single-page-application"`.
- The deployed Worker serves static assets from `dist/`.
- Core tools do not call a file-processing backend.
- Do not commit `.env`, `.dev.vars`, `dist`, `.wrangler`, build logs, TypeScript build info, or PRD/planning documents.

## Privacy Model

Toolzi is built around local browser processing. Uploaded files are read through browser APIs such as `File`, `Blob`, `arrayBuffer`, object URLs, and Canvas. Generated outputs are downloaded as local browser-created files.

No MVP tool should upload file contents, notes, todos, invoice data, or generated content to a backend.
