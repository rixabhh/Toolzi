import { useEffect, useState } from "react";
import { categories, categoryCopy, tools } from "../../tools/registry";
import { useFavorites } from "../../hooks/useFavorites";
import { Badge } from "../common/Badge";
import { PredictiveSearch } from "./PredictiveSearch";
import { ToolCard } from "./ToolCard";

const heroPhrases = [
  "PDF fixes",
  "smaller images",
  "QR codes",
  "clean text",
  "GST math",
  "quick invoices",
  "brat memes"
];

function TypewriterHeadline() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncMotion = () => setReduceMotion(media.matches);

    syncMotion();
    media.addEventListener("change", syncMotion);
    return () => media.removeEventListener("change", syncMotion);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;

    const interval = window.setInterval(() => {
      setPhraseIndex((index) => (index + 1) % heroPhrases.length);
    }, 2350);

    return () => window.clearInterval(interval);
  }, [reduceMotion]);

  const phrase = reduceMotion ? heroPhrases[0] : heroPhrases[phraseIndex];

  return (
    <h1>
      <span>Tiny tools for</span>
      <span className="typewriter-line">
        <span className="typewriter-word" aria-live="polite">
          <span key={phrase} className="typewriter-text">
            {phrase}
          </span>
        </span>
      </span>
    </h1>
  );
}

export function HomePage() {
  const popular = tools.filter((tool) => tool.popular);
  const { favorites } = useFavorites();
  const favoriteTools = favorites.map((id) => tools.find((tool) => tool.id === id)).filter(Boolean) as typeof tools;

  return (
    <div className="home-page">
      <section className="hero neu-card">
        <div className="hero-copy">
          <p className="eyebrow">Toolzi</p>
          <TypewriterHeadline />
          <p>Compress images, merge PDFs, make QR codes, and more, right in your browser.</p>
          <div className="badge-row">
            <Badge icon="check">Runs in your browser</Badge>
            <Badge icon="check">No uploads</Badge>
            <Badge icon="check">Free forever</Badge>
          </div>
        </div>
      </section>

      <PredictiveSearch />

      {favoriteTools.length > 0 && (
        <section className="section-block">
          <div className="section-heading">
            <h2>Favorite tools</h2>
            <p>Your pinned tools stay here on this browser.</p>
          </div>
          <div className="tool-grid">
            {favoriteTools.map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>
      )}

      <section className="section-block">
        <div className="section-heading">
          <h2>Popular tools</h2>
          <p>The quick ones people reach for most.</p>
        </div>
        <div className="tool-grid">
          {popular.map((tool) => (
            <ToolCard key={tool.id} tool={tool} />
          ))}
        </div>
      </section>

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

      <section className="privacy-panel neu-card">
        <h2>Private by default.</h2>
        <p>
          Most online tools upload your files before doing anything. Toolzi does the work in your browser instead. That
          means your PDFs, images, notes, and documents stay on your device.
        </p>
        <div className="badge-row">
          <Badge>Local processing</Badge>
          <Badge>No account required</Badge>
          <Badge>No server uploads</Badge>
          <Badge>Works fast</Badge>
        </div>
      </section>
    </div>
  );
}
