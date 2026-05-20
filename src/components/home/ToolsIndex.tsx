import { categories, categoryCopy, tools } from "../../tools/registry";
import { useFavorites } from "../../hooks/useFavorites";
import { ToolCard } from "./ToolCard";

export function ToolsIndex() {
  const { favorites } = useFavorites();
  const favoriteTools = favorites.map((id) => tools.find((tool) => tool.id === id)).filter(Boolean) as typeof tools;

  return (
    <div className="tools-index">
      <section className="tools-index-hero neu-card">
        <p className="eyebrow">All tools</p>
        <h1>Pick a tool and get it done.</h1>
        <p>Every core Toolzi utility runs locally in your browser. No upload, no account, no waiting around.</p>
      </section>
      {favoriteTools.length > 0 && (
        <section className="section-block">
          <div className="section-heading">
            <h2>Favorite tools</h2>
            <p>Your pinned tools stay at the top on this browser.</p>
          </div>
          <div className="tool-grid">
            {favoriteTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>
      )}
      {categories.map((category) => (
        <section className="section-block" id={category} key={category}>
          <div className="section-heading">
            <span className={`category-dot ${category.toLowerCase()}`} />
            <h2>{category === "Calculate" ? "Calculators" : `${category} Tools`}</h2>
            <p>{categoryCopy[category]}</p>
          </div>
          <div className="tool-grid">
            {tools.filter((tool) => tool.category === category).map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
