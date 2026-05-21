# Toolzi

<p align="center">
  <img src="./public/favicon.svg" width="92" height="92" alt="Toolzi logo" />
</p>

<h3 align="center">Tiny browser tools for everyday stuff.</h3>

<p align="center">
  Compress images, merge PDFs, make QR codes, clean text, calculate GST, create invoices, and handle quick browser tasks without uploads or sign-ups.
</p>

<p align="center">
  <a href="https://github.com/rixabhh">Built with ❤️ by rixabhh</a>
</p>

## What It Does

Toolzi is a privacy-first toolkit for small daily tasks. It runs in the browser, keeps files on your device, and gives people quick access to tools that usually sit across multiple websites.

## Highlights

| Feature | Why it matters |
| --- | --- |
| 🧰 40+ everyday tools | PDFs, images, text, calculators, creators, productivity, developer helpers, and privacy tools. |
| 🔒 Local-first workflow | Files are processed in the browser. No upload-first flow for core tools. |
| ⚡ Fast access | Search, categories, favorites, and recent tools help users get to the right action quickly. |
| 📱 Mobile-friendly UI | Compact controls, cleaner navigation, and phone-first spacing for quick use on small screens. |
| ⬇️ Installable web app | Supported browsers can install Toolzi as a standalone web app from the header install button. |
| 🌓 Light and dark modes | A simple icon toggle keeps the interface comfortable in different environments. |

## Tool Categories

| Category | Tools |
| --- | --- |
| 📄 PDF | Merge PDFs, split PDFs, image to PDF, Markdown to PDF. |
| 🖼️ Image | Compress, resize, convert, and remove simple solid backgrounds. |
| ✍️ Text | Count words, convert case, clean copied text. |
| 🧮 Calculate | GST, percentages, dates, age, BMI, EMI, and units. |
| 🎨 Create | QR codes, invoices, signatures, favicons, and meme-style images. |
| ✅ Productivity | Notes, todos, Pomodoro, stopwatch, and countdown. |
| 🧑‍💻 Developer | JSON, Base64, URLs, UUIDs, regex, colors, gradients, HTML, CSV, and diffs. |
| 🛡️ Privacy | Password generator, password strength, and SHA-256 file hashes. |

## Install As An App

Toolzi includes a web app manifest, app icons, and a service worker. On supported browsers, an install button appears in the header so users can add Toolzi to their phone or desktop and open it like a regular app.

Browser support varies. If the install button is not shown, users can still use the browser's "Add to Home Screen" or install option when available.

## Privacy

Toolzi is designed around local browser processing. Files are read through browser APIs and outputs are generated on the device. Notes, todos, favorites, recent tools, and drafts stay in local browser storage.

## Built With

- React
- Vite
- TypeScript
- React Router
- Tailwind CSS and custom UI styles
- Browser APIs for local file work

## Run Locally

```bash
npm install
npm run dev
```

## Check The Build

```bash
npm test
npm run build
```

## Creator

Toolzi is built and maintained by [rixabhh](https://github.com/rixabhh).
