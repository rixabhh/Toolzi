import { Link } from "react-router-dom";
import { useFavorites } from "../../hooks/useFavorites";
import { ToolIcon } from "../common/ToolIcon";
import type { Tool } from "../../tools/registry";

export function ToolCard({ tool }: { tool: Tool }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(tool.id);

  return (
    <Link to={tool.route} className="tool-card neu-card">
      <button
        className={`favorite-button ${favorite ? "active" : ""}`}
        type="button"
        aria-label={favorite ? `Remove ${tool.name} from favorites` : `Mark ${tool.name} as favorite`}
        title={favorite ? "Remove favorite" : "Mark favorite"}
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();
          toggleFavorite(tool.id);
        }}
      >
        {favorite ? "\u2605" : "\u2606"}
      </button>
      <ToolIcon name={tool.icon} category={tool.category} />
      <strong>{tool.name}</strong>
      <p>{tool.description}</p>
      <small>{tool.category} / Runs locally</small>
    </Link>
  );
}
