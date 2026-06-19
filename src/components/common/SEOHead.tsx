import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getSEOForPath } from "../../data/seo";

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

function upsertJsonLd(id: string, data: object) {
  let script = document.head.querySelector<HTMLScriptElement>(`script[data-seo-schema="${id}"]`);

  if (!script) {
    script = document.createElement("script");
    script.type = "application/ld+json";
    script.dataset.seoSchema = id;
    document.head.appendChild(script);
  }

  script.textContent = JSON.stringify(data);
}

export function SEOHead() {
  const location = useLocation();

  useEffect(() => {
    const seo = getSEOForPath(location.pathname);

    document.title = seo.title;
    upsertCanonical(seo.canonical);
    upsertMeta('meta[name="description"]', "name", "description", seo.description);
    upsertMeta('meta[property="og:title"]', "property", "og:title", seo.title);
    upsertMeta('meta[property="og:description"]', "property", "og:description", seo.description);
    upsertMeta('meta[property="og:url"]', "property", "og:url", seo.canonical);
    upsertMeta('meta[property="og:type"]', "property", "og:type", "website");
    upsertMeta('meta[property="og:image"]', "property", "og:image", seo.ogImage);
    upsertMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", seo.title);
    upsertMeta('meta[name="twitter:description"]', "name", "twitter:description", seo.description);

    document.head
      .querySelectorAll<HTMLScriptElement>("script[data-seo-schema]")
      .forEach((script) => script.remove());

    seo.schema.forEach((schema, index) => upsertJsonLd(String(index), schema));
  }, [location.pathname]);

  return null;
}
