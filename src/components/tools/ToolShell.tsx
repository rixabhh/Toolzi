import { useEffect } from "react";
import { Link } from "react-router-dom";
import { addRecentTool } from "../../lib/storage";
import { useFavorites } from "../../hooks/useFavorites";
import { getRelatedTools, type Tool } from "../../tools/registry";
import { Badge } from "../common/Badge";
import { ToolIcon } from "../common/ToolIcon";
import { ToolCard } from "../home/ToolCard";

export function ToolShell({ tool, children }: { tool: Tool; children: React.ReactNode }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(tool.id);

  useEffect(() => {
    addRecentTool(tool.id);
  }, [tool.id]);

  return (
    <div className="tool-page">
      <nav className="breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/tools">Tools</Link>
        <span>/</span>
        <span>{tool.name}</span>
      </nav>
      <header className="tool-hero neu-card">
        <ToolIcon name={tool.icon} category={tool.category} />
        <div>
          <h1>{tool.name}</h1>
          <p>{tool.description}</p>
          <div className="badge-row">
            <Badge>Runs locally</Badge>
            <Badge>No upload</Badge>
            <Badge>No sign-up</Badge>
          </div>
        </div>
        <button
          className={`favorite-button tool-favorite-button ${favorite ? "active" : ""}`}
          type="button"
          aria-label={favorite ? `Remove ${tool.name} from favorites` : `Mark ${tool.name} as favorite`}
          onClick={() => toggleFavorite(tool.id)}
        >
          {favorite ? "\u2605" : "\u2606"}
        </button>
      </header>
      {children}
      <section className="section-block">
        <div className="section-heading">
          <h2>Related tools</h2>
          <p>Small helpers that pair well with this one.</p>
        </div>
        <div className="tool-grid">
          {getRelatedTools(tool.related).map((related) => (
            <ToolCard key={related.id} tool={related} />
          ))}
        </div>
      </section>
    </div>
  );
}
