import { getSEOForPath } from "../data/seo";

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function metaName(name: string, content: string) {
  return `<meta name="${name}" content="${escapeHtml(content)}" />`;
}

function metaProperty(property: string, content: string) {
  return `<meta property="${property}" content="${escapeHtml(content)}" />`;
}

export function renderSEOHead(pathname: string) {
  const seo = getSEOForPath(pathname);

  return [
    `<title>${escapeHtml(seo.title)}</title>`,
    metaName("description", seo.description),
    `<link rel="canonical" href="${escapeHtml(seo.canonical)}" />`,
    metaProperty("og:title", seo.title),
    metaProperty("og:description", seo.description),
    metaProperty("og:url", seo.canonical),
    metaProperty("og:type", "website"),
    metaProperty("og:image", seo.ogImage),
    metaName("twitter:card", "summary_large_image"),
    metaName("twitter:title", seo.title),
    metaName("twitter:description", seo.description),
    ...seo.schema.map(
      (schema, index) =>
        `<script type="application/ld+json" data-seo-schema="${index}">${JSON.stringify(schema).replace(
          /</g,
          "\\u003c"
        )}</script>`
    )
  ].join("\n    ");
}
