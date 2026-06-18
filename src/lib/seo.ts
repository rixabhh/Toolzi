export const SITE_URL = "https://toolzi.rixxabh.workers.dev";
export const SITE_NAME = "Toolzi";
export const DEFAULT_TITLE = "Toolzi - Privacy-first browser tools for PDFs, images, text, and more";
export const DEFAULT_DESCRIPTION =
  "Toolzi is a privacy-first, local-first toolkit for PDFs, images, text, calculators, developer utilities, and everyday browser tools. Files stay on your device.";
export const DEFAULT_IMAGE = `${SITE_URL}/icon-512.png`;

type SeoOptions = {
  title?: string;
  description?: string;
  path?: string;
  keywords?: string[];
};

function upsertMeta(selector: string, attribute: "name" | "property", key: string, content: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);

  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }

  element.content = content;
}

function upsertCanonical(url: string) {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');

  if (!link) {
    link = document.createElement("link");
    link.rel = "canonical";
    document.head.appendChild(link);
  }

  link.href = url;
}

export function setSeo({ title = DEFAULT_TITLE, description = DEFAULT_DESCRIPTION, path = "/", keywords = [] }: SeoOptions = {}) {
  const canonicalUrl = new URL(path, SITE_URL).toString();

  document.title = title;
  upsertCanonical(canonicalUrl);
  upsertMeta('meta[name="description"]', "name", "description", description);
  upsertMeta('meta[property="og:title"]', "property", "og:title", title);
  upsertMeta('meta[property="og:description"]', "property", "og:description", description);
  upsertMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl);
  upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
  upsertMeta('meta[name="twitter:description"]', "name", "twitter:description", description);

  if (keywords.length > 0) {
    upsertMeta('meta[name="keywords"]', "name", "keywords", keywords.join(", "));
  }
}
