import { mkdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const distDir = path.join(rootDir, "dist");
const serverEntry = path.join(distDir, "server", "entry-server.js");
const templatePath = path.join(distDir, "index.html");

const { render, routesToPrerender, sitemapRoutes, SITE_URL } = await import(pathToFileURL(serverEntry));
const template = await readFile(templatePath, "utf8");

function outputPathForRoute(route) {
  if (route === "/") {
    return path.join(distDir, "index.html");
  }

  if (route === "/404") {
    return path.join(distDir, "404.html");
  }

  return path.join(distDir, route.replace(/^\//, ""), "index.html");
}

function renderDocument(route, appHtml, headHtml) {
  return template
    .replace("<!--seo-head-->", headHtml)
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
}

for (const route of routesToPrerender) {
  const { html, head } = await render(route);
  const filePath = outputPathForRoute(route);
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, renderDocument(route, html, head), "utf8");

  if (route === "/404") {
    const nested404Path = path.join(distDir, "404", "index.html");
    await mkdir(path.dirname(nested404Path), { recursive: true });
    await writeFile(nested404Path, renderDocument(route, html, head), "utf8");
  }
}

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapRoutes
  .map(
    ({ path: route, priority }) => `  <url>
    <loc>${SITE_URL}${route === "/" ? "" : route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>
`;

await writeFile(path.join(distDir, "sitemap.xml"), sitemap, "utf8");
await writeFile(
  path.join(distDir, "robots.txt"),
  `User-agent: *
Allow: /

# Replace with your production domain
Sitemap: https://YOUR_CUSTOM_DOMAIN/sitemap.xml
`,
  "utf8"
);

await rm(path.join(distDir, "server"), { recursive: true, force: true });
