import {
  categoryLongCopy,
  categoryReasons,
  categorySlug,
  getCategoryBySlug,
  tools
} from "../../tools/registry";
import { ToolCard } from "./ToolCard";

export function CategoryLandingPage({ slug }: { slug: string }) {
  const category = getCategoryBySlug(slug);

  if (!category) {
    return null;
  }

  const categoryTools = tools.filter((tool) => tool.category === category);
  const heading = category === "Calculate" ? "Calculate Tools" : `${category} Tools`;

  return (
    <div className="tools-index">
      <section className="tools-index-hero neu-card">
        <p className="eyebrow">Toolzi / {categorySlug(category)}</p>
        <h1>{heading} - Free and Browser-Based | Toolzi</h1>
        <p>{categoryLongCopy[category]}</p>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <span className={`category-dot ${category.toLowerCase()}`} />
          <h2>{heading}</h2>
          <p>Choose a local-first browser tool and get the result without sending your work elsewhere.</p>
        </div>
        <div className="tool-grid">
          {categoryTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <h2>Why use Toolzi for {category.toLowerCase()}?</h2>
        </div>
        <ul className="content-list">
          {categoryReasons[category].map((reason) => (
            <li key={reason}>{reason}</li>
          ))}
        </ul>
      </section>
    </div>
  );
}
