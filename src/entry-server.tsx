import { PassThrough } from "node:stream";
import React from "react";
import { renderToPipeableStream } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import App from "./app/App";
import { routesToPrerender, sitemapRoutes, SITE_URL } from "./data/seo";
import { renderSEOHead } from "./lib/renderSeo";

export { routesToPrerender, sitemapRoutes, SITE_URL };

export async function render(url: string) {
  const app = (
    <React.StrictMode>
      <MemoryRouter initialEntries={[url]}>
        <App />
      </MemoryRouter>
    </React.StrictMode>
  );

  const html = await new Promise<string>((resolve, reject) => {
    let didError = false;

    const { pipe, abort } = renderToPipeableStream(app, {
      onAllReady() {
        const stream = new PassThrough();
        const chunks: Buffer[] = [];

        stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
        stream.on("end", () => {
          const markup = Buffer.concat(chunks).toString("utf8");
          if (didError) {
            reject(new Error(`SSR failed for ${url}`));
            return;
          }

          resolve(markup);
        });

        pipe(stream);
      },
      onError(error) {
        didError = true;
        reject(error);
      }
    });

    setTimeout(() => abort(), 15000);
  });

  return {
    html,
    head: renderSEOHead(url)
  };
}
