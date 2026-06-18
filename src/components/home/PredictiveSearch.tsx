import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { searchTools } from "../../lib/search";
import { readLocalJson } from "../../lib/storage";
import { tools } from "../../tools/registry";
import { ToolIcon } from "../common/ToolIcon";

export function PredictiveSearch() {
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();
  const recent = readLocalJson<string[]>("toolzi:recent-tools", []);
  const results = useMemo(() => searchTools(query, tools, recent), [query, recent.join("|")]);

  return (
    <section className="search-section">
      <label htmlFor="tool-search">What do you need to do?</label>
      <div className="search-box">
        <input
          id="tool-search"
          value={query}
          placeholder='Try "compress image", "combine PDFs", "chatgpt to pdf", or "calculate GST".'
          onChange={(event) => {
            setQuery(event.target.value);
            setActiveIndex(0);
          }}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              setActiveIndex((value) => Math.min(value + 1, results.length - 1));
            }
            if (event.key === "ArrowUp") {
              event.preventDefault();
              setActiveIndex((value) => Math.max(value - 1, 0));
            }
            if (event.key === "Enter" && results[activeIndex]) navigate(results[activeIndex].tool.route);
            if (event.key === "Escape") setQuery("");
          }}
        />
      </div>
      <div className="sr-only" aria-live="polite">
        {query ? `${results.length} tools found` : ""}
      </div>
      {query && (
        <div className="search-results">
          {results.length === 0 ? (
            <p className="empty-state">Couldn&apos;t find that yet. Try another word like &quot;PDF&quot;, &quot;image&quot;, &quot;text&quot;, or &quot;calculate&quot;.</p>
          ) : (
            results.map((result, index) => (
              <Link
                key={result.tool.id}
                className={`search-result ${index === activeIndex ? "active" : ""}`}
                to={result.tool.route}
              >
                <ToolIcon name={result.tool.icon} category={result.tool.category} />
                <span>
                  <strong>{result.tool.name}</strong>
                  <small>{result.tool.description}</small>
                  <em>{result.tool.category} · Runs locally</em>
                </span>
              </Link>
            ))
          )}
        </div>
      )}
    </section>
  );
}
